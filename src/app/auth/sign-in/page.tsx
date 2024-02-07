import { redirect } from 'next/navigation';
import Link from 'next/link';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { SubmitButton } from '@/features/shared/ui/control/button/SubmitButton';
import { GitHubLogoIcon } from '@/features/shared/ui/icon/GitHubLogoIcon';
import { GoogleLogoIcon } from '@/features/shared/ui/icon/GoogleLogoIcon';
import { LinkedInInLogoIcon } from '@/features/shared/ui/icon/LinkedInInLogoIcon';
import { XLogoIcon } from '@/features/shared/ui/icon/XLogoIcon';
import { OAuthProviderButton } from '@/features/shared/ui/control/button/OAuthProviderButton';
import { signInWithEmail, signInWithOAuth } from '@/features/auth/data-access/AuthDataAccess';
import { OAuthProvider } from '@/features/auth/data-access/OAuthProvider';
import { isUserAuthenticated } from '@/features/app/users/data-access/UsersDataAccess';

export default async function SignInPage() {
  /*
   * Redirect authenticated users to the app.
   */
  const isAuthenticated = await isUserAuthenticated();
  if (isAuthenticated) redirect('/app/today');
  /**/

  return (
    <div className="pb-20">
      <h2 className="mb-9 mt-8 text-center text-xl font-semibold text-gray-900">Sign in</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <OAuthProviderButton action={signInWithOAuth} provider={OAuthProvider.Google}>
          <GoogleLogoIcon />
          Continue with Google
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider={OAuthProvider.Github}>
          <GitHubLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with GitHub
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider={OAuthProvider.Twitter}>
          <XLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with X
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider={OAuthProvider.Linkedin}>
          <LinkedInInLogoIcon />
          Continue with LinkedIn
        </OAuthProviderButton>
        {process.env.NEXT_PUBLIC_URL !== 'https://opentask.app' && (
          <>
            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <p className="mx-4 flex-shrink text-gray-400">Or</p>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <form action={signInWithEmail}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
                required
                data-lpignore="true"
              />
              <SubmitButton className={`${buttonGreenClassName} flex w-full justify-center`}>
                Continue with Email
              </SubmitButton>
            </form>
          </>
        )}
        <p className="mt-6 text-xs text-gray-600">
          You agree to our{' '}
          <Link href="/terms" className=" hover:text-green-500 underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className=" hover:text-green-500 underline">
            Privacy Policy
          </Link>{' '}
          by continuing with any option above.
        </p>
      </div>
    </div>
  );
}
