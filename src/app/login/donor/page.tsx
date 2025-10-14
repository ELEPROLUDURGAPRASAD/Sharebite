import { LoginForm } from '@/components/auth/login-form';
import ShareBiteLogo from '@/components/icons/sharebite-logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { User } from 'lucide-react';

export default function DonorLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-sm">
        <Card className="shadow-2xl rounded-2xl border-2 border-opacity-50">
           <CardHeader className="text-center space-y-4">
             <div className="flex justify-center items-center gap-4">
                <ShareBiteLogo className="h-12 w-12" />
                <span className="font-headline text-5xl text-primary">ShareBite</span>
             </div>
             <div className='flex justify-center items-center gap-2'>
                <User className="w-8 h-8 text-primary"/>
                <CardTitle className="font-headline text-4xl text-primary">Donor Login</CardTitle>
            </div>
            <CardDescription className="text-lg pt-2">
              Welcome back! Please sign in to your donor account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm">
              Don't have an account?{' '}
              <Link href="/" className="font-semibold text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
