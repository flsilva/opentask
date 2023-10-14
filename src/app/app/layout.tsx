import { Session } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { UserProvider } from '@/modules/app/user/UserProvider';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';
import { AppHeader } from '@/modules/app/shared/AppHeader';
import PwaPromptModal from '@/modules/shared/pwa/PwaPromptModal';
import AppNav from '@/modules/app/shared/AppNav';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let session: Session;

  try {
    session = await getSessionOrThrow();
  } catch {
    // log error
    redirect('/auth/sign-in');
  }

  const projects = await getAllProjects();

  return (
    <UserProvider session={session}>
      <div className="flex flex-col h-full overflow-hidden bg-white">
        <AppHeader />
        <div className="flex h-full overflow-hidden">
          <div className="hidden lg:flex">
            <AppNav projects={projects} />
          </div>
          <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
            <div className="flex w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
              <div className="pb-16">
                {children}
                {(!projects || projects.length === 0) && (
                  <p className="mt-4 text-sm font-medium text-gray-600">
                    You don&#39;t have any projects yet.{' '}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <PwaPromptModal />
      </div>
    </UserProvider>
  );
}
