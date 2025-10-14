import AuthForm from '@/components/auth/auth-form';
import ShareBiteLogo from '@/components/icons/sharebite-logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-2xl border-2 border-opacity-50">
          <CardHeader className="text-center space-y-4">
             <div className="flex justify-center items-center gap-4">
                <ShareBiteLogo className="h-16 w-16" />
                <span className="font-headline text-5xl text-primary">ShareBite</span>
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
