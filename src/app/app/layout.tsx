import { redirect } from 'next/navigation';
import { UserProvider } from '@/modules/app/users/UserProvider';
import { getUser, UserDto } from '@/modules/app/users/UsersRepository';
import { Header } from '@/modules/app/shared/Header';
import { PwaPromptModal } from '@/modules/shared/pwa/PwaPromptModal';
import { MainMenuController } from '@/modules/app/shared/MainMenuController';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { ErrorList } from '@/modules/shared/errors/ErrorList';

export default async function AppLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  let user: UserDto;
  try {
    user = await getUser();
  } catch {
    redirect('/auth/sign-in');
  }

  const { data: projects, errors } = await getAllProjects();

  return (
    <UserProvider user={user}>
      <div className="flex flex-col h-full overflow-hidden bg-white">
        <Header />
        {projects && (
          <div className="flex h-full overflow-hidden">
            <div className="hidden lg:flex">
              <MainMenuController projects={projects} />
            </div>
            <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
              <div className="flex w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
                <div className="pb-16">
                  {children}
                  {modal}
                  {(!projects || projects.length === 0) && (
                    <p className="mt-4 text-sm font-medium text-gray-600">
                      You don&#39;t have any projects yet.{' '}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {errors && <ErrorList errors={errors} />}
        <PwaPromptModal />
      </div>
    </UserProvider>
  );
}
