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
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function RegistrationForm({ role }: { role: UserRole }) {
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${role}-name`}>{nameLabel}</Label>
        <div className="relative">
          {icon}
          <Input id={`${role}-name`} required className="pl-8" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email / Phone</Label>
        <div className="relative">
          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-email`} required type="email" className="pl-8" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <div className="relative">
          <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-password`} required type="password" className="pl-8" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-location`}>Location</Label>
        <div className="relative">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input id={`${role}-location`} required className="pl-8" />
        </div>
      </div>
      <Button type="submit" className="w-full" asChild>
        <Link href={dashboardUrl}>Register</Link>
      </Button>
    </div>
  );
}

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<UserRole>('donor');

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
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
