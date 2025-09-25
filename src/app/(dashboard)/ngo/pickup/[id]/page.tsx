'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Map, CheckCircle, Package, Truck, ArrowLeft, LocateFixed } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function PickupPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'pending' | 'collected' | 'delivered'>('pending');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();
  
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  const handleCollect = () => setStatus('collected');

  const handleEnableLocation = () => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location enabled:', position.coords.latitude, position.coords.longitude);
        setLocationEnabled(true);
        setIsLocating(false);
        toast({
            title: "Location Enabled",
            description: "GPS tracking is now active.",
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        toast({
            variant: 'destructive',
            title: "Location Access Denied",
            description: "Please enable location services in your browser to proceed.",
        });
      }
    );
  };
  
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
              <CardDescription>
                {locationEnabled ? "Live route is now active." : "Enable GPS tracking to view the live route to the donor's location."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {locationEnabled ? (
                mapImage && (
                  <Image 
                    src={mapImage.imageUrl} 
                    alt="Map to location" 
                    width={800} 
                    height={400} 
                    className="rounded-lg border" 
                    data-ai-hint={mapImage.imageHint}
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center bg-muted rounded-lg border-2 border-dashed h-96 p-8 text-center">
                    <LocateFixed className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">GPS Tracking Required</h3>
                    <p className="text-muted-foreground mb-6">
                        You must enable location services to proceed with the pickup. This helps donors track your arrival.
                    </p>
                    <Button onClick={handleEnableLocation} disabled={isLocating} size="lg">
                        {isLocating ? 'Locating...' : 'Enable Live Location'}
                    </Button>
                </div>
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
              
                {!locationEnabled && (
                    <Alert variant="default" className="bg-amber-100 border-amber-200 text-amber-900">
                        <AlertTitle>Action Required</AlertTitle>
                        <AlertDescription>
                            Please enable your location to mark the food as collected.
                        </AlertDescription>
                    </Alert>
                )}

              {status === 'pending' && (
                <Button onClick={handleCollect} size="lg" className="w-full" disabled={!locationEnabled}>
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
