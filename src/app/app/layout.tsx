import { redirect } from 'next/navigation';
import { Header } from '@/modules/app/shared/Header';
import { MainMenu } from '@/modules/app/shared/main-menu/MainMenu';
import { InstallPwaDialog } from '@/modules/shared/pwa/InstallPwaDialog';
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
  /*
   * Redirect to sign-in if user is not signed in.
   */
  let user: UserDto;
  try {
    user = await getUser();
  } catch {
    redirect('/auth/sign-in');
  }
  /**/

  return (
    <UserProvider user={user}>
      <div className="flex flex-col h-full overflow-hidden bg-white">
        <Header />
        <div className="flex h-full overflow-hidden">
          <div className="hidden lg:flex">
            <MainMenu />
          </div>
          <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
            <div className="flex w-full flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
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
    </UserProvider>
  );
}
