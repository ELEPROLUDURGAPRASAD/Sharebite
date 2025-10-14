import AuthForm from '@/components/auth/auth-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShareBiteLogo } from '@/components/icons/sharebite-logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-2xl border-2 border-opacity-50">
          <CardHeader className="text-center space-y-4">
             <div className="flex justify-center">
                <ShareBiteLogo className="w-48 h-auto" />
             </div>
            <CardDescription className="text-lg pt-4">
              Join our community to share and receive food.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
