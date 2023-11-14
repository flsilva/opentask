import { redirect } from 'next/navigation';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { Header } from '@/modules/app/shared/Header';
import { MainMenu } from '@/modules/app/shared/main-menu/MainMenu';
import { InstallPwaDialog } from '@/modules/shared/pwa/InstallPwaDialog';
import { getProjects } from '@/modules/app/projects/ProjectsRepository';
import { UserProvider } from '@/modules/app/users/UserProvider';
import { UpdateUserTimeZone } from '@/modules/app/users/UpdateUserTimeZone';
import { getUser, UserDto } from '@/modules/app/users/UsersRepository';

export default async function AppLayout({
  children,
  dialog,
}: {
  children: React.ReactNode;
  dialog: React.ReactNode;
}) {
  let user: UserDto;
  try {
    user = await getUser();
  } catch {
    redirect('/auth/sign-in');
  }

  const { data: projects, errors } = await getProjects();

  return (
    <UserProvider user={user}>
      <div className="flex flex-col h-full overflow-hidden bg-white">
        <Header />
        <div className="flex h-full overflow-hidden">
          <div className="hidden lg:flex">
            <MainMenu />
          </div>
          <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
            <div className="flex w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
              <div className="pb-16">
                {children}
                {dialog}
                {errors && <ErrorList errors={errors} />}
                {!errors && (!projects || projects.length === 0) && (
                  <>
                    <p className="mt-4 text-sm font-medium text-gray-600">
                      You don&#39;t have any projects yet.
                    </p>
                    <Link
                      href="/app/projects/new"
                      className={twMerge(buttonGreenClassName, 'w-fit mt-6')}
                    >
                      Create your first!
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <InstallPwaDialog />
        <UpdateUserTimeZone />
      </div>
    </UserProvider>
  );
}
