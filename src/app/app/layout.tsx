import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { UserData } from './shared/user/UserData';
import UserSessionProvider from './shared/user/UserSessionProvider';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log('AppLayout() - session: ', session);
  if (!session) redirect('/auth/sign-in');

  const user: UserData = {
    id: session.user.id,
    email: session.user.email,
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <UserSessionProvider user={user}>{children}</UserSessionProvider>
    </div>
  );
}
