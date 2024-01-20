import '../globals.css';
import { redirect } from 'next/navigation';
import { Header } from '@/features/marketing/shared/ui/Header';
import { Footer } from '@/features/marketing/shared/ui/Footer';
import { isUserAuthenticated } from '@/features/app/users/data-access/UsersDataAccess';

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  /*
   * Redirect authenticated users to the app.
   */
  const isAuthenticated = await isUserAuthenticated();
  if (isAuthenticated) redirect('/app/onboarding');
  /**/

  return (
    <>
      <div className="flex flex-1 flex-col bg-white">
        <Header />
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-20">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
