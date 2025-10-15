'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  CalendarClock,
  Car,
  ChevronDown,
  Home,
  Hotel,
  Salad,
  ShoppingBasket,
  Users,
} from 'lucide-react';
import { ImageAnalysis } from './image-analysis';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { FoodDonation } from '@/lib/types';
import { useAuth } from '@/firebase';
import { createDonation } from '@/app/actions';

const donorTypes = [
  { id: 'restaurant', label: 'Restaurant', icon: Salad },
  { id: 'catering', label: 'Catering', icon: Users },
  { id: 'hostel', label: 'Hostel', icon: Hotel },
  { id: 'retailer', label: 'Retailer', icon: ShoppingBasket },
  { id: 'households', label: 'Households', icon: Home },
  { id: 'others', label: 'Others', icon: Building2 },
];

export default function DonationForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!photoDataUri) {
      toast({
        title: 'Image Required',
        description: 'Please upload a photo of the food donation.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }
    
    if(!auth.currentUser){
         toast({
            title: "Authentication Error",
            description: "You must be logged in to create a donation.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }


    const formData = new FormData(e.currentTarget);
    const donationData: Omit<FoodDonation, 'id' | 'donorId' | 'status' | 'photoUrl'> = {
        foodType: formData.get('foodType') as string,
        quantity: Number(formData.get('quantity')),
        expiry: new Date(formData.get('expiry') as string).toISOString(),
        location: formData.get('location') as string,
        otherDetails: formData.get('otherDetails') as string,
        donorCategory: formData.get('donorCategory') as FoodDonation['donorCategory'],
        contactName: formData.get('contactName') as string,
        contactMobile: formData.get('contactMobile') as string,
    }

    try {
        const token = await auth.currentUser.getIdToken();
        await createDonation(donationData, photoDataUri, token);

        toast({
            title: "Submission Successful!",
            description: "Your donation has been listed. An NGO will be notified.",
        });
        (e.target as HTMLFormElement).reset();
        setPhotoDataUri(null);
        // We might need to manually reset the ImageAnalysis component state
    } catch (error: any) {
        console.error("Donation creation failed:", error);
        toast({
            title: "Submission Failed",
            description: error.message || "Could not save your donation. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Create a New Donation
          </CardTitle>
          <CardDescription>
            Fill out the details below to list your food contribution.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">
              Select Donor Category
            </Label>
            <RadioGroup
              defaultValue="restaurant"
              name="donorCategory"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              required
            >
              {donorTypes.map(({ id, label, icon: Icon }) => (
                <div key={id}>
                  <RadioGroupItem value={id} id={id} className="peer sr-only" />
                  <Label
                    htmlFor={id}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Icon className="mb-3 h-8 w-8" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="food-type">Food Type</Label>
              <Input
                id="food-type"
                name="foodType"
                placeholder="e.g., Cooked Meals, Bread"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (Servings)</Label>
               <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="e.g., 25"
                required
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Best Before / Expiry</Label>
              <div className="relative">
                <CalendarClock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="expiry"
                  name="expiry"
                  type="datetime-local"
                  className="pl-8"
                  required
                  defaultValue={new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0,16)}
                />
              </div>
            </div>
          </div>

          <ImageAnalysis onImageUpload={setPhotoDataUri} />

          <div className="space-y-2">
            <Label htmlFor="location">
              <Car className="inline-block mr-2 h-4 w-4" /> Pickup Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Enter full pickup address"
              required
            />
          </div>

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between" type="button">
                Contact Person Details (Optional)
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 p-4 border rounded-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" name="contactName" placeholder="Rohan Kumar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-mobile">Mobile Number</Label>
                  <Input
                    id="contact-mobile"
                    name="contactMobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="other-details">Additional Notes</Label>
                <Textarea
                  id="other-details"
                  name="otherDetails"
                  placeholder="Any special instructions for pickup..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Donation"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
