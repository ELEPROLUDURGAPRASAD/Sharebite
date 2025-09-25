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
import { DollarSign, HandHeart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DonorDashboard() {
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
            <SheetHeader>
              <SheetTitle className="font-headline text-3xl text-primary">
                Contribute Financially
              </SheetTitle>
              <SheetDescription>
                Your monetary contributions help us cover logistics and reach more
                people in need. Thank you for your support!
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="donor-name">Donor Name</Label>
                <Input id="donor-name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donor-mobile">Mobile Number</Label>
                <Input id="donor-mobile" defaultValue="+1 234 567 890" />
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
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pay to Mobile Number</Label>
                <p className="text-lg font-semibold tracking-wider p-3 bg-secondary rounded-md">
                  +1 800-SHARE-BITE
                </p>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Confirm Contribution
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <DonationForm />
    </div>
  );
}
