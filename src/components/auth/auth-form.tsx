'use client';

import type { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  User,
  Mail,
  KeyRound,
  MapPin,
  Building,
  HeartHandshake,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth, useFirestore } from '@/firebase';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function RegistrationForm({ role }: { role: UserRole }) {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const getRoleSpecifics = () => {
    switch (role) {
      case 'donor':
        return {
          nameLabel: 'Full Name / Organization Name',
          icon: <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />,
          dashboardUrl: '/donor',
        };
      case 'ngo':
        return {
          nameLabel: 'NGO Name',
          icon: <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />,
          dashboardUrl: '/ngo',
        };
      case 'acceptor':
        return {
          nameLabel: 'Full Name',
          icon: <HeartHandshake className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />,
          dashboardUrl: '/acceptor',
        };
    }
  };

  const { nameLabel, icon, dashboardUrl } = getRoleSpecifics();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) return;

    try {
      // Create user in Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        // Save user data to Firestore
        const userRef = doc(firestore, 'users', user.uid);
        const userData = {
          id: user.uid,
          userType: role,
          name,
          email,
          phone,
          location,
        };
        setDocumentNonBlocking(userRef, userData, { merge: true });

        toast({
          title: 'Registration Successful',
          description: 'Redirecting to your dashboard...',
        });
        router.push(dashboardUrl);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-name`}>{nameLabel}</Label>
        <div className="relative">
          {icon}
          <Input id={`${role}-name`} required className="pl-8" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-email`} required type="email" className="pl-8" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
       <div className="space-y-2">
        <Label htmlFor={`${role}-phone`}>Phone</Label>
        <div className="relative">
          <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-phone`} required type="tel" className="pl-8" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-password`} required type="password" className="pl-8" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-location`}>Location</Label>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-location`} required className="pl-8" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<UserRole>('donor');

  const getLoginLink = () => {
    switch (activeTab) {
      case 'donor':
        return '/login/donor';
      case 'ngo':
        return '/login/ngo';
      case 'acceptor':
        return '/login/acceptor';
      default:
        return '/login/donor';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="donor"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as UserRole)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="donor">Donor</TabsTrigger>
          <TabsTrigger value="ngo">NGO</TabsTrigger>
          <TabsTrigger value="acceptor">Acceptor</TabsTrigger>
        </TabsList>
        <TabsContent value="donor">
          <RegistrationForm role="donor" />
        </TabsContent>
        <TabsContent value="ngo">
          <RegistrationForm role="ngo" />
        </TabsContent>
        <TabsContent value="acceptor">
          <RegistrationForm role="acceptor" />
        </TabsContent>
      </Tabs>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href={getLoginLink()} className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
