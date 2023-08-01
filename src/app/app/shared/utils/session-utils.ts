import { Session, createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export const getSessionOrThrow = async () => {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    session === null ||
    session === undefined ||
    session.user === null ||
    session.user === undefined ||
    typeof session.user.id !== 'string' ||
    session.user.id === ''
  )
    throw new Error('Your session has expired. Please sign in again.');

  return session;
};
