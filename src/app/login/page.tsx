import { LoginForm } from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { ShareBiteLogo } from '@/components/icons/sharebite-logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-sm">
        <Card className="shadow-2xl rounded-2xl border-2 border-opacity-50">
           <CardHeader className="text-center space-y-4">
             <div className="flex justify-center">
                <ShareBiteLogo className="w-48 h-auto" />
             </div>
            <CardDescription className="text-lg pt-4">
              Welcome back! Please sign in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm">
              Don&apos;t have an account?{' '}
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
