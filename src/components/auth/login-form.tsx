'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { KeyRound, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      if (user && firestore && !isRedirecting) {
        setIsRedirecting(true); // Prevent multiple redirects
        try {
          const userDocRef = doc(firestore, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userType = userData.userType;

            switch (userType) {
              case 'donor':
                router.push('/donor');
                break;
              case 'ngo':
                router.push('/ngo');
                break;
              case 'acceptor':
                router.push('/acceptor');
                break;
              default:
                // Fallback to a default dashboard if userType is not set
                router.push('/donor');
                break;
            }
          } else {
             // Handle case where user exists in Auth but not in Firestore
            router.push('/donor');
          }
        } catch (error) {
            console.error("Failed to fetch user data:", error)
            // Fallback redirection
            router.push('/donor');
        }
      }
    };

    if (!isUserLoading) {
      checkUserAndRedirect();
    }
  }, [user, isUserLoading, firestore, router, isRedirecting]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (auth) {
        initiateEmailSignIn(auth, email, password);
        toast({
            title: "Logging In...",
            description: "Please wait while we sign you in.",
        })
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>        <div className="relative">
          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="pl-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            id="password" 
            type="password" 
            required 
            className="pl-8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
