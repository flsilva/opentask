import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import UserSessionProvider from './shared/user/UserSessionProvider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/auth/sign-in');

  return (
    <div className="flex h-screen flex-col bg-white">
      <UserSessionProvider session={session}>{children}</UserSessionProvider>
    </div>
  );
}
