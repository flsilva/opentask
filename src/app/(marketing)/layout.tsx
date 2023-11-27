import '../globals.css';
import { redirect } from 'next/navigation';
import { Header } from '@/modules/marketing/shared/Header';
import { Footer } from '@/modules/marketing/shared/Footer';
import { isUserAuthenticated } from '@/modules/app/users/UsersRepository';

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
