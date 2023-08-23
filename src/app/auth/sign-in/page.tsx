import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import {
  buttonClassNameGreen,
  buttonClassNameWhite,
} from '@/app/modules/common//button/buttonClassName';
import { ChildrenProps } from '@/app/modules/common/ChildrenProps';
import { GitHubLogoIcon } from '@/app/modules/common/icon/GitHubLogoIcon';
import { LinkedInInLogoIcon } from '@/app/modules/common/icon/LinkedInInLogoIcon';
import { TwitterLogoIcon } from '@/app/modules/common/icon/TwitterLogoIcon';

export type Provider = 'github' | 'linkedin' | 'twitter';

interface OAuthProviderButtonProps extends ChildrenProps {
  readonly provider: Provider;
}

export default async function SignIn() {
  /*
   * Redirect users to the app if they're signed in.
   */
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/app/today');
  /**/

  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const redirectTo = `${baseUrl}/auth/callback`;

  const signInWithEmailHandler = async (formData: FormData) => {
    'use server';
    const email = String(formData.get('email'));

    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      console.log(error);
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

  const OAuthProviderButton = ({ children, provider }: OAuthProviderButtonProps) => (
    <form action={signInWithOAuth}>
      <input type="hidden" name="provider" value={provider} />
      <button type="submit" className={`${buttonClassNameWhite} mt-4 w-full gap-2`}>
        {children}
      </button>
    </form>
  );

  return (
    <div className="pb-24">
      <h2 className="mb-9 mt-12 text-center text-xl font-semibold text-gray-900">Sign in</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <OAuthProviderButton provider="twitter">
          <TwitterLogoIcon width="1rem" height="1rem" className="fill-[#1e9cf1]" />
          Continue with Twitter
        </OAuthProviderButton>
        <OAuthProviderButton provider="github">
          <GitHubLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with GitHub
        </OAuthProviderButton>
        <OAuthProviderButton provider="linkedin">
          <LinkedInInLogoIcon />
          Continue with LinkedIn
        </OAuthProviderButton>
        {baseUrl === 'http://localhost:3000' && (
          <>
            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <p className="mx-4 flex-shrink text-gray-400">Or</p>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <form action={signInWithEmailHandler}>
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
              <button
                type="submit"
                className={`${buttonClassNameGreen} flex w-full justify-center`}
              >
                Continue with Email
              </button>
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
