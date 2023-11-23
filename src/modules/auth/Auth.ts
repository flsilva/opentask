'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { OAuthProvider } from './OAuthProvider';

const redirectTo = `${process.env.NEXT_PUBLIC_URL}/auth/callback`;

export const signInWithEmail = async (formData: FormData) => {
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

export const signInWithOAuth = async (formData: FormData) => {
  'use server';
  const provider = String(formData.get('provider')) as OAuthProvider;
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
