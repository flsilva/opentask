'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '../utils/model-utils';
import { getSessionOrThrow } from '../utils/session-utils';

export const deleteUserAccount = async () => {
  const {
    user: { id },
  } = await getSessionOrThrow();

  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  const supabase = createServerActionClient<Database>({ cookies });
  try {
    return await supabase.auth.signOut();
  } catch (error) {
    console.log(error);
    redirect('/');
  }
};
