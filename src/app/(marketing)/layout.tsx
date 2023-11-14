import '../globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database.types';
import { Header } from '@/modules/marketing/shared/Header';
import { Footer } from '@/modules/marketing/shared/Footer';

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  /*
   * Redirect users to the app if they're signed in.
   */
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/app/onboarding');
  /**/

  return (
    <>
      <div className="flex flex-1 flex-col bg-white">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
