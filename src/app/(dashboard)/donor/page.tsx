'use client';

import { useState } from 'react';
import DonationForm from '@/components/dashboard/donor/donation-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { IndianRupee, HandHeart, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DonorDashboard() {
  const { toast } = useToast();
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContributionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Contribution Submitted!',
      description: 'Thank you for your generous support.',
    });
    // Here you would typically handle the form submission, including uploading the receipt.
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-headline text-primary">Donor Dashboard</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <HandHeart className="mr-2 h-5 w-5" /> Contribute Money
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="font-headline text-3xl text-primary">
                Contribute Financially
              </SheetTitle>
              <SheetDescription>
                Your monetary contributions help us cover logistics and reach
                more people in need. Thank you for your support!
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-grow pr-6 -mr-6">
              <form onSubmit={handleContributionSubmit} id="contribution-form" className="mt-4 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Donor Name</Label>
                  <Input id="donor-name" defaultValue="Priya Sharma" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donor-mobile">Mobile Number</Label>
                  <Input
                    id="donor-mobile"
                    defaultValue="+91 98765 43210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="1000"
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pay to Mobile Number</Label>
                  <p className="text-lg font-semibold tracking-wider p-3 bg-secondary rounded-md">
                    8790639039
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt-upload">Upload Receipt</Label>
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="receipt-upload"
                      className="flex-grow cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-full p-2 border-2 border-dashed rounded-md hover:bg-muted">
                        <Upload className="h-5 w-5 mr-2" />
                        <span>
                          {receipt ? 'Change image' : 'Select image'}
                        </span>
                      </div>
                      <Input
                        id="receipt-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleReceiptChange}
                        accept="image/*"
                      />
                    </Label>
                  </div>
                </div>

                {receiptPreview && (
                  <div>
                    <Label>Receipt Preview</Label>
                    <div className="mt-2 relative aspect-video w-full mx-auto overflow-hidden rounded-md">
                      <Image
                        src={receiptPreview}
                        alt="Receipt preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </form>
            </ScrollArea>
             <SheetFooter className="mt-auto pt-4">
              <Button type="submit" form="contribution-form" size="lg" className="w-full">
                Submit Contribution
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <DonationForm />
    </div>
  );
}
