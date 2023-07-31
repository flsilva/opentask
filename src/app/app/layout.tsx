import { redirect } from 'next/navigation';
import UserSessionProvider from './shared/user/UserSessionProvider';
import { getSession } from './shared/utils/session-utils';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/auth/sign-in');

  return (
    <div className="flex h-screen flex-col bg-white">
      <UserSessionProvider session={session}>{children}</UserSessionProvider>
    </div>
  );
}
