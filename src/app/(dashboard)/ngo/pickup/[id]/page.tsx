'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Replace with donor's actual location for a real implementation
const donorLocation = {
  lat: 34.0522,
  lng: -118.2437,
};

// Replace with NGO's current location
const ngoLocation = {
    lat: 34.0592,
    lng: -118.2597
}


export default function PickupPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'collecting' | 'delivering'>(
    'collecting'
  );
  const router = useRouter();
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyCIBPCw-_TC2l4JVaSLBCdp8nZEky5aayM",
  });

  const handlePickup = () => {
    setStatus('delivering');
  };

  const handleDone = () => {
    router.push('/ngo');
  };

  const calculateRoute = () => {
    if (window.google && window.google.maps) {
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
            }
        }
        );
    }
  };


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
                <h2 className="text-3xl font-bold font-headline">Food Delivered</h2>
                <p className="text-muted-foreground text-lg">
                Thank you for your contribution!
                </p>
            </div>
            <Button size="lg" className="w-full mt-8" onClick={handleDone}>
                Done
            </Button>
        </div>
      </div>
    );
  }

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
                {isLoaded ? (
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={donorLocation}
                    zoom={13}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                    }}
                    onLoad={calculateRoute}
                    >
                        {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                ) : (
                    <div className="flex items-center justify-center h-full">Loading Map...</div>
                )}
            </div>

            <div className="p-4 border-t bg-white">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center"><MapPin className="h-5 w-5 mr-2 text-primary"/> Pickup Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Gourmet Grill</p>
                        <p className="text-muted-foreground">123 Main St, Anytown, USA</p>
                        <Button variant="outline" className="w-full mt-4">
                            <Navigation className="mr-2 h-4 w-4"/>
                            Navigate
                        </Button>
                    </CardContent>
                </Card>
                <Button size="lg" className="w-full mt-4" onClick={handlePickup}>
                    Picked up
                </Button>
            </div>
      </div>
    </div>
  );
}
