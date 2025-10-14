'use client';
import { Bell, Home, LifeBuoy, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ShareBiteLogo } from '@/components/icons/sharebite-logo';

export default function DashboardHeader() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (auth) {
      signOut(auth).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <Link
        href="/donor"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <ShareBiteLogo className="h-8 w-8" />
        <span className="font-headline text-2xl text-primary">ShareBite</span>
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/donor"
          className="text-foreground transition-colors hover:text-primary"
        >
          Donor
        </Link>
        <Link
          href="/ngo"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          NGO
        </Link>
        <Link
          href="/acceptor"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          Acceptor
        </Link>
      </nav>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0 text-xs"
              >
                3
              </Badge>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  You have 3 new messages.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-secondary">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage
                        src="https://picsum.photos/seed/ngo-logo/40/40"
                        data-ai-hint="logo"
                      />
                      <AvatarFallback>NGO</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Request Accepted</p>
                    <p className="text-sm text-muted-foreground">
                      Hope Foundation has accepted your donation of 10 meals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-secondary">
                  <div className="flex-shrink-0">
                    <Image
                      src="https://picsum.photos/seed/food-delivered/40/40"
                      alt="Food delivered"
                      width={40}
                      height={40}
                      className="rounded-md"
                      data-ai-hint="food distribution"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Food Delivered!</p>
                    <p className="text-sm text-muted-foreground">
                      Thank you for your contribution!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
