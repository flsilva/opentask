import { Session } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { UserProvider } from '@/modules/app/user/UserProvider';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let session: Session;

  try {
    session = await getSessionOrThrow();
  } catch {
    // log error
    redirect('/auth/sign-in');
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <UserProvider session={session}>{children}</UserProvider>
    </div>
  );
}
