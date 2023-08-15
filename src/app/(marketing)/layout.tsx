import '../globals.css';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/database.types';
import Header from './shared/ui/Header';
import Footer from './shared/ui/Footer';

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  /*
   * Redirect users to the app if they're signed in.
   */
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/app/today');
  /**/

  return (
    <>
      <div className="mb-20 flex flex-1 flex-col bg-white">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
