import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

export const getSession = async () => {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
