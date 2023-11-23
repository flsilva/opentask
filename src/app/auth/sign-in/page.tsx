import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import {
  buttonGreenClassName,
  buttonWhiteClassName,
} from '@/modules/shared//controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { GitHubLogoIcon } from '@/modules/shared/icons/GitHubLogoIcon';
import { GoogleLogoIcon } from '@/modules/shared/icons/GoogleLogoIcon';
import { LinkedInInLogoIcon } from '@/modules/shared/icons/LinkedInInLogoIcon';
import { XLogoIcon } from '@/modules/shared/icons/XLogoIcon';

export type Provider = 'github' | 'google' | 'linkedin' | 'twitter';

interface OAuthProviderButtonProps extends ChildrenProps {
  readonly action: (formData: FormData) => void;
  readonly provider: Provider;
}

const OAuthProviderButton = ({ action, children, provider }: OAuthProviderButtonProps) => (
  <form action={action}>
    <input type="hidden" name="provider" value={provider} />
    <SubmitButton
      className={twMerge(buttonWhiteClassName, 'mt-4 w-full')}
      labelClassName="gap-2"
      spinnerClassName="border-green-600 border-b-white"
    >
      {children}
    </SubmitButton>
  </form>
);

export default async function SignInPage() {
  /*
   * Redirect users to the app if they're signed in.
   */
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/app/onboarding');
  /**/

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const redirectTo = `${baseUrl}/auth/callback`;

  const onSignInWithEmail = async (formData: FormData) => {
    'use server';
    const email = String(formData.get('email'));
    const supabase = createServerActionClient<Database>({ cookies });

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.error(error);
      throw new Error('There was an error trying to sign you in.');
    } else {
      redirect(`/auth/sign-in/check-email-link?email=${email}`);
    }
  };

  const signInWithOAuth = async (formData: FormData) => {
    'use server';
    const provider = String(formData.get('provider')) as Provider;
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });

    if (error || typeof data.url !== 'string') {
      throw new Error('There was an error trying to sign you in.');
    } else {
      redirect(data.url);
    }
  };

  return (
    <div className="pb-24">
      <h2 className="mb-9 mt-12 text-center text-xl font-semibold text-gray-900">Sign in</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <OAuthProviderButton action={signInWithOAuth} provider="google">
          <GoogleLogoIcon />
          Continue with Google
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider="github">
          <GitHubLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with GitHub
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider="twitter">
          <XLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with X
        </OAuthProviderButton>
        <OAuthProviderButton action={signInWithOAuth} provider="linkedin">
          <LinkedInInLogoIcon />
          Continue with LinkedIn
        </OAuthProviderButton>
        {baseUrl !== 'https://opentask.app' && (
          <>
            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <p className="mx-4 flex-shrink text-gray-400">Or</p>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <form action={onSignInWithEmail}>
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
