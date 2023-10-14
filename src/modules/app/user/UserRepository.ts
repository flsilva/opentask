'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '@/modules/app/shared/utils/model-utils';
import { getSessionOrThrow } from '@/modules/app/shared/utils/session-utils';

export interface UserDto {
  readonly email: string;
  readonly name: string;
}

export const deleteUserAccount = async () => {
  const {
    user: { id },
  } = await getSessionOrThrow();

  try {
    await prisma.user.delete({ where: { id } });
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
