'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Navigation,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { FoodDonation, UserProfile } from '@/lib/types';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function PickupPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'collecting' | 'delivering'>(
    'collecting'
  );
  const router = useRouter();
  const { toast } = useToast();
  const { firestore } = useFirebase();
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [ngoLocation, setNgoLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [donor, setDonor] = useState<UserProfile | null>(null);

  const donationRef = useMemoFirebase(() => {
    if (!firestore || !params.id) return null;
    return doc(firestore, 'foodDonations', params.id);
  }, [firestore, params.id]);

  const {
    data: donation,
    isLoading: donationLoading,
    error: donationError,
  } = useDoc<FoodDonation>(donationRef);

  useEffect(() => {
    if (donation && firestore && !donor) {
      const donorRef = doc(firestore, 'users', donation.donorId);
      getDoc(donorRef).then((docSnap) => {
        if (docSnap.exists()) {
          setDonor(docSnap.data() as UserProfile);
        }
      });
    }
  }, [donation, firestore, donor]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNgoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLocationError(
            'Could not get your location. Please enable location services.'
          );
          toast({
            variant: 'destructive',
            title: 'Location Access Denied',
            description:
              'Please enable location services in your browser to use the GPS tracker.',
          });
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  }, [toast]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const donorLocation = useMemo(() => {
    if (!donor) return null;
    // This is a placeholder. In a real app, you'd parse donor.location
    // which should ideally be a GeoPoint or a structured address.
    return { lat: 17.9689, lng: 79.5941 };
  }, [donor]);

  const calculateRoute = () => {
    if (window.google && window.google.maps && ngoLocation && donorLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: ngoLocation,
          destination: donorLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
            toast({
              variant: 'destructive',
              title: 'Could not calculate route',
            });
          }
        }
      );
    }
  };

  useEffect(() => {
    if (isLoaded && ngoLocation && donorLocation) {
      calculateRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, ngoLocation, donorLocation]);

  const handlePickup = async () => {
    if (donationRef) {
      await updateDoc(donationRef, { status: 'picked-up' });
      setStatus('delivering');
      toast({ title: 'Food collected!', description: 'Status updated to picked-up.' });
    }
  };

  const handleDone = () => {
    router.push('/ngo');
  };

  const handleNavigate = () => {
    if (donorLocation) {
      const { lat, lng } = donorLocation;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(url, '_blank');
    }
  };
  
  if (donationLoading) {
     return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (donationError) {
      return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{donationError.message}</AlertDescription></Alert>
  }

  if (status === 'delivering') {
    return (
      <div
        className="container mx-auto flex flex-col items-center justify-center text-center p-4 bg-background"
        style={{ minHeight: 'calc(100vh - 8rem)' }}
      >
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="p-6 bg-secondary rounded-full">
              <CheckCircle2 className="h-20 w-20 text-primary" />
            </div>
            <h2 className="text-3xl font-bold font-headline">Food Picked Up</h2>
            <p className="text-muted-foreground text-lg">
              Thank you for your service!
            </p>
          </div>
          <Button size="lg" className="w-full mt-8" onClick={handleDone}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const center = ngoLocation || donorLocation;

  return (
    <div className="container mx-auto flex flex-col items-center p-0 md:p-4 h-[calc(100vh-8rem)] bg-gray-50">
      <div className="w-full max-w-md h-full flex flex-col bg-background shadow-lg">
        <div className="p-4 border-b">
          <Link
            href="/ngo"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </Link>
          <h1 className="text-2xl font-headline font-bold text-center">
            Collection
          </h1>
        </div>

        <div className="flex-grow relative">
          {loadError && (
            <div className="flex items-center justify-center h-full p-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Map Error</AlertTitle>
                <AlertDescription>
                  Google Maps could not be loaded. Please try opening in
                  Google Maps directly.
                </AlertDescription>
              </Alert>
            </div>
          )}
          {locationError && !loadError && (
            <div className="flex items-center justify-center h-full p-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            </div>
          )}
          {!loadError && !locationError && isLoaded && center ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          ) : (
            !loadError &&
            !locationError && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-4">Loading Map...</p>
              </div>
            )
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" /> Pickup Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{donor?.name || 'Loading...'}</p>
              <p className="text-muted-foreground">{donation?.location}</p>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleNavigate}
                disabled={!donorLocation}
              >
                <Navigation className="mr-2 h-4 w-4" />
                Navigate in Google Maps
              </Button>
            </CardContent>
          </Card>
          <Button
            size="lg"
            className="w-full mt-4"
            onClick={handlePickup}
            disabled={!ngoLocation || !donation}
          >
            Picked up
          </Button>
        </div>
      </div>
    </div>
  );
}
