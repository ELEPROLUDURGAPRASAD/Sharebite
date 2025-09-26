'use client';

import { useState } from 'react';
import DonationForm from '@/components/dashboard/donor/donation-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { DollarSign, HandHeart, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

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
          <SheetContent>
            <form onSubmit={handleContributionSubmit}>
              <SheetHeader>
                <SheetTitle className="font-headline text-3xl text-primary">
                  Contribute Financially
                </SheetTitle>
                <SheetDescription>
                  Your monetary contributions help us cover logistics and reach
                  more people in need. Thank you for your support!
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Donor Name</Label>
                  <Input id="donor-name" defaultValue="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donor-mobile">Mobile Number</Label>
                  <Input
                    id="donor-mobile"
                    defaultValue="+1 234 567 890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50.00"
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
                    <div className="mt-2 relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-md">
                      <Image
                        src={receiptPreview}
                        alt="Receipt preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full mt-4">
                  Submit Contribution
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <DonationForm />
    </div>
  );
}
