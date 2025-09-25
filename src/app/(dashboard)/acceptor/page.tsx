'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { HandHeart, Hash, Phone } from 'lucide-react';

export default function AcceptorDashboard() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Sent!",
      description: "An NGO has been notified of your request. They will contact you shortly.",
    });
  }

  return (
    <div className="container mx-auto flex justify-center items-center" style={{ minHeight: 'calc(100vh - 10rem)' }}>
      <Card className="w-full max-w-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <HandHeart className="w-16 h-16 text-primary"/>
            </div>
            <CardTitle className="font-headline text-4xl text-primary">Request Meals</CardTitle>
            <CardDescription className="text-lg">
              Let us know your need, and we&apos;ll connect you with an NGO.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile-number">Your Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="mobile-number" type="tel" placeholder="Enter your mobile number" required className="pl-8"/>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="meals-needed">Number of Meals Needed</Label>
              <div className="relative">
                <Hash className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="meals-needed" type="number" placeholder="e.g., 4" required min="1" className="pl-8"/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" type="submit">
                Send Request to NGO
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
