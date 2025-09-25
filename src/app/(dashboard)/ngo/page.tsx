import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Salad, Utensils } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const pickupRequests = [
    { id: 1, type: 'Restaurant', name: 'Gourmet Grill', meals: 15, distance: '2.3km', imageUrl: 'https://picsum.photos/seed/restaurant1/400/200', imageHint: 'restaurant food' },
    { id: 2, type: 'Catering', name: 'Occasions Catering', meals: 50, distance: '5.1km', imageUrl: 'https://picsum.photos/seed/catering1/400/200', imageHint: 'catering buffet' },
    { id: 3, type: 'Households', name: 'Jane D.', meals: 5, distance: '1.5km', imageUrl: 'https://picsum.photos/seed/household1/400/200', imageHint: 'home cooked meal' },
    { id: 4, type: 'Retailer', name: 'Fresh Mart', meals: 25, distance: '8.7km', imageUrl: 'https://picsum.photos/seed/retailer1/400/200', imageHint: 'groceries produce' },
];

export default function NgoDashboard() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-headline text-primary">NGO Dashboard</h1>
        <Badge variant="outline" className="text-lg py-2 px-4">4 New Pickup Requests</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pickupRequests.map(request => (
            <Card key={request.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-40 w-full">
                    <Image src={request.imageUrl} alt={request.name} fill className="object-cover" data-ai-hint={request.imageHint}/>
                </div>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center justify-between">
                        <span>{request.name}</span>
                        <Badge variant="secondary">{request.type}</Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center pt-2">
                        <Utensils className="h-4 w-4 mr-2 text-primary"/>
                        Approx. {request.meals} meals
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-primary"/>
                        <span>{request.distance} away</span>
                     </div>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={`/ngo/pickup/${request.id}`}>
                            Accept Request
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>

       <div className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Delivery Dashboard</CardTitle>
                    <CardDescription>Upload images of food redistribution to share with donors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline">Upload Redistribution Images</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
