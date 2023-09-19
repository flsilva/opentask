import { Session } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import UserSessionProvider from '@/modules/app/user/UserSessionProvider';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let session: Session | null;

  try {
    session = await getSessionOrThrow();
  } catch {
    // log error
    redirect('/auth/sign-in');
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <UserSessionProvider session={session}>{children}</UserSessionProvider>
    </div>
  );
}
