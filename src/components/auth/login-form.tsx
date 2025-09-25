'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you'd perform authentication here.
    // For this prototype, we'll just redirect to the donor dashboard.
    router.push('/donor');
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="pl-8"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id="password" type="password" required className="pl-8" />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
