'use client';

import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { FoodDonation, UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Utensils, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type DonationCardProps = {
  donation: FoodDonation & { id: string };
  donor?: UserProfile | null;
};

function DonationCard({ donation, donor }: DonationCardProps) {
  const distance = Math.random() * 10; // Placeholder
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-40 w-full">
        <Image
          src={donation.photoUrl}
          alt={donation.foodType}
          fill
          className="object-cover"
          data-ai-hint="food donation"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-between">
          <span>{donor?.name || 'A Kind Donor'}</span>
          <Badge variant="secondary">{donation.donorCategory}</Badge>
        </CardTitle>
        <CardDescription className="flex items-center pt-2">
          <Utensils className="h-4 w-4 mr-2 text-primary" />
          Approx. {donation.quantity} meals of {donation.foodType}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          <span>{distance.toFixed(1)}km away</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/ngo/pickup/${donation.id}`}>
            Accept Request
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function NgoDashboard() {
  const { firestore } = useFirebase();
  const [donors, setDonors] = useState<Record<string, UserProfile>>({});

  const pendingDonationsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'foodDonations'),
      where('status', '==', 'pending')
    );
  }, [firestore]);

  const {
    data: donations,
    isLoading: donationsLoading,
    error,
  } = useCollection<FoodDonation>(pendingDonationsQuery);

  useEffect(() => {
    if (donations && firestore) {
      const fetchDonors = async () => {
        const donorIds = [
          ...new Set(donations.map((d) => d.donorId).filter((id) => !donors[id])),
        ];
        if (donorIds.length > 0) {
          const newDonors: Record<string, UserProfile> = {};
          await Promise.all(
            donorIds.map(async (id) => {
              const donorRef = doc(firestore, 'users', id);
              const donorSnap = await getDoc(donorRef);
              if (donorSnap.exists()) {
                newDonors[id] = donorSnap.data() as UserProfile;
              }
            })
          );
          setDonors((prev) => ({ ...prev, ...newDonors }));
        }
      };
      fetchDonors();
    }
  }, [donations, firestore, donors]);

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-headline text-primary">NGO Dashboard</h1>
        {donations && (
          <Badge variant="outline" className="text-lg py-2 px-4">
            {donations.length} New Pickup Requests
          </Badge>
        )}
      </div>
      
      {donationsLoading && (
        <div className='flex justify-center items-center h-64'>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className='ml-4 text-lg'>Loading new requests...</p>
        </div>
      )}

      {error && <p className='text-red-500'>Error loading donations: {error.message}</p>}

      {!donationsLoading && donations?.length === 0 && (
        <Card className='text-center p-8'>
          <CardTitle>No new requests</CardTitle>
          <CardDescription className='mt-2'>There are currently no pending food donations. Check back later!</CardDescription>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {donations?.map((donation) => (
          <DonationCard
            key={donation.id}
            donation={donation}
            donor={donors[donation.donorId]}
          />
        ))}
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Delivery Dashboard
            </CardTitle>
            <CardDescription>
              Upload images of food redistribution to share with donors.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Upload Redistribution Images</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
