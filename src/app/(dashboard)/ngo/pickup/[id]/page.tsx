'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, CheckCircle2, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PickupPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'collecting' | 'delivering'>(
    'collecting'
  );
  const router = useRouter();

  const mapImage = PlaceHolderImages.find(
    (img) => img.id === 'map-placeholder'
  );

  const handlePickup = () => {
    setStatus('delivering');
  };

  const handleDone = () => {
    router.push('/ngo');
  };

  if (status === 'delivering') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center text-center p-4" style={{minHeight: 'calc(100vh - 8rem)'}}>
         <div className="w-full max-w-sm">
            <h1 className="text-4xl font-headline font-bold mb-8">Delivery</h1>
            <div className="flex flex-col items-center justify-center p-8 space-y-6">
                 <div className="p-6 bg-secondary rounded-full">
                     <CheckCircle2 className="h-20 w-20 text-primary" />
                 </div>
                 <h2 className="text-3xl font-bold">Food Delivered</h2>
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
    <div className="container mx-auto flex flex-col items-center p-4">
       <div className="w-full max-w-sm">
        <Link href="/ngo" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 self-start">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
        </Link>
        <h1 className="text-4xl font-headline font-bold text-center mb-8">Collection</h1>
        
        {mapImage && (
            <div className="relative w-full aspect-[9/16] max-h-[60vh] rounded-lg overflow-hidden border mb-8">
                 <Image
                    src={mapImage.imageUrl}
                    alt="Map route"
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                />
            </div>
        )}

        <Button size="lg" className="w-full" onClick={handlePickup}>
            Picked up
        </Button>
       </div>
    </div>
  );
}
