import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { buttonClassNameWhite } from '@/app/shared/ui//button/buttonClassName';
import { ChildrenProps } from '@/app/shared/ui/ChildrenProps';
import { GitHubLogoIcon } from '@/app/shared/ui/icon/GitHubLogoIcon';
import { LinkedInInLogoIcon } from '@/app/shared/ui/icon/LinkedInInLogoIcon';
import { TwitterLogoIcon } from '@/app/shared/ui/icon/TwitterLogoIcon';

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

  const signInWithOAuth = async (formData: FormData) => {
    'use server';
    const provider = String(formData.get('provider')) as Provider;
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
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
