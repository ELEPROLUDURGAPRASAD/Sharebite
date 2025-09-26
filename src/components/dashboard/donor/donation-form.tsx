'use client';

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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Submission Successful!",
            description: "Your donation has been listed. An NGO will be notified.",
        });
    }

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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {donorTypes.map(({ id, label, icon: Icon }) => (
                <div key={id}>
                  <RadioGroupItem
                    value={id}
                    id={id}
                    className="peer sr-only"
                  />
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
              <Input id="food-type" placeholder="e.g., Cooked Meals, Bread" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Select>
                <SelectTrigger id="quantity">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">Serves 1-10 people</SelectItem>
                  <SelectItem value="11-30">Serves 11-30 people</SelectItem>
                  <SelectItem value="31-50">Serves 31-50 people</SelectItem>
                  <SelectItem value="51+">Serves 51+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Best Before / Expiry</Label>
              <div className="relative">
                <CalendarClock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="expiry" type="datetime-local" className="pl-8" />
              </div>
            </div>
          </div>

          <ImageAnalysis />

          <div className="space-y-2">
            <Label htmlFor="location">
              <Car className="inline-block mr-2 h-4 w-4" /> Pickup Location
            </Label>
            <Input
              id="location"
              placeholder="Enter full pickup address"
              defaultValue="123 Main Street, Warangal, Telangana, India"
            />
          </div>

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Other Details (Optional)
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4 p-4 border rounded-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="Rohan Kumar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-mobile">Mobile Number</Label>
                  <Input
                    id="contact-mobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-details">Additional Notes</Label>
                <Textarea
                  id="other-details"
                  placeholder="Any special instructions for pickup..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" type="submit">Submit Donation</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
