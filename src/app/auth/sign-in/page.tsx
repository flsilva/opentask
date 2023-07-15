import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { AppleLogoIcon } from '@/app/shared/ui/icon/AppleLogoIcon';
import { FacebookLogoIcon } from '@/app/shared/ui/icon/FacebookLogoIcon';
import { GitHubLogoIcon } from '@/app/shared/ui/icon/GitHubLogoIcon';
import { GoogleLogoIcon } from '@/app/shared/ui/icon/GoogleLogoIcon';
import { TwitterLogoIcon } from '@/app/shared/ui/icon/TwitterLogoIcon';
import Button from '@/app/shared/ui/button/Button';
import { redirect } from 'next/navigation';

export default function SignIn() {
  const signInWithEmailHandler = async (formData: FormData) => {
    'use server';
    const email = String(formData.get('email'));

    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      throw new Error('There was an error trying to sign you in.');
    } else {
      redirect(`/auth/sign-in/check-email-link?email=${email}`);
    }
  };

  const signInWithGoogleHandler = async () => {
    'use server';
    console.log('signInWithGoogleHandler()');
    const supabase = createServerActionClient<Database>({ cookies });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    console.log('signInWithGoogleHandler() - data: ', data);
    console.log('signInWithGoogleHandler() - error: ', error);

    if (error || typeof data.url !== 'string') {
      throw new Error('There was an error trying to sign you in.');
    } else {
      redirect(data.url);
    }
  };

  return (
    <div>
      <h2 className="mt-12 text-center text-xl font-semibold text-gray-900">Sign in</h2>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form>
          <Button
            type="submit"
            formAction={signInWithGoogleHandler}
            color="white"
            className="mt-8 w-full gap-2"
          >
            <GoogleLogoIcon />
            Continue with Google
          </Button>
        </form>
        <Button href="/" color="white" className="mt-4 gap-2">
          <AppleLogoIcon />
          Continue with Apple
        </Button>
        <Button href="/" color="white" className="mt-4 gap-2">
          <FacebookLogoIcon />
          Continue with Facebook
        </Button>
        <Button href="/" color="white" className="mt-4 gap-2">
          <TwitterLogoIcon width="1rem" height="1rem" className="fill-[#1e9cf1]" />
          Continue with Twitter
        </Button>
        <Button href="/" color="white" className="mt-4 gap-2">
          <GitHubLogoIcon width="1rem" height="1rem" className="fill-black" />
          Continue with GitHub
        </Button>
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <p className="mx-4 flex-shrink text-gray-400">Or</p>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <form>
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
          <Button
            type="submit"
            formAction={signInWithEmailHandler}
            className="flex w-full justify-center"
          >
            Continue with Email
          </Button>
        </form>
      </div>
    </div>
  );
}
