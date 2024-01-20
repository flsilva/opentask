import { redirect } from 'next/navigation';
import { Header } from '@/features/app/shared/ui/Header';
import { MainMenu } from '@/features/app/shared/ui/MainMenu';
import { InstallPwaDialog } from '@/features/shared/ui/pwa/InstallPwaDialog';
import { UpdateUserTimeZone } from '@/features/app/users/ui/UpdateUserTimeZone';
import { isUserAuthenticated } from '@/features/app/users/data-access/UsersDataAccess';

export default async function AppLayout({
  children,
  dialog,
}: {
  children: React.ReactNode;
  dialog: React.ReactNode;
}) {
  /*
   * Redirect unauthenticated users to the authentication page.
   */
  const isAuthenticated = await isUserAuthenticated();
  if (!isAuthenticated) redirect('/auth/sign-in');
  /**/

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <Header />
      <div className="flex h-full overflow-hidden">
        <MainMenu className="hidden lg:flex" />
        <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
          <div className="flex w-full flex-col px-4 md:pl-8 xl:pl-36  2xl:pl-60 md:max-w-[38rem] lg:max-w-[60rem]">
            <div className="pb-16">
              {children}
              {dialog}
            </div>
          </div>
        </div>
      </div>
      <InstallPwaDialog />
      <UpdateUserTimeZone />
    </div>
  );
}
