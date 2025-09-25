'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Map, CheckCircle, Package, Truck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PickupPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'pending' | 'collected' | 'delivered'>('pending');
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  const handleCollect = () => setStatus('collected');
  
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending Collection</Badge>;
      case 'collected':
        return <Badge className="bg-blue-500 text-white">Food Collected</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500 text-white">Delivered</Badge>;
    }
  };

  return (
    <div className="container mx-auto">
      <Link href="/ngo" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Requests
      </Link>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-headline text-primary">Pickup Details #{params.id}</h1>
        {getStatusBadge()}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline flex items-center">
                <Map className="mr-3 h-6 w-6 text-primary" />
                Navigation to Gourmet Grill
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mapImage && (
                <Image 
                  src={mapImage.imageUrl} 
                  alt="Map to location" 
                  width={800} 
                  height={400} 
                  className="rounded-lg border" 
                  data-ai-hint={mapImage.imageHint}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Collection Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Gourmet Grill</h3>
                  <p className="text-muted-foreground text-sm">123 Culinary Lane, Foodville</p>
                </div>
              </div>
              
              <Separator />

              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">15 Meals</h3>
                  <p className="text-muted-foreground text-sm">To be picked up</p>
                </div>
              </div>
              
              {status === 'pending' && (
                <Button onClick={handleCollect} size="lg" className="w-full">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Mark as Collected
                </Button>
              )}
               {status === 'collected' && (
                <p className="text-center font-semibold p-4 bg-blue-100 text-blue-800 rounded-md border border-blue-200">
                  Food has been picked up!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
