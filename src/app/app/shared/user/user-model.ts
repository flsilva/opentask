'use server';
import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '../utils/model-utils';
import { getSessionOrThrow } from '../utils/session-utils';

export interface CreateUserData {
  readonly email: string;
  readonly id: string;
  readonly name?: string;
  readonly provider: string;
}

export const createUser = async (data: CreateUserData) => {
  const user = await prisma.user.findUnique({ where: { id: data.id } });
  if (user) return user;
  return await prisma.user.create({ data });
};

export const deleteUserAccount = async () => {
  const {
    user: { id },
  } = await getSessionOrThrow();

  await prisma.user.delete({ where: { id } });

  const supabase = createServerActionClient<Database>({ cookies });
  return await supabase.auth.signOut();
};
