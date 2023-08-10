'use server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { getSessionOrThrow } from '../utils/session-utils';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export interface CreateUserData {
  readonly email: string;
  readonly id: string;
  readonly name?: string;
  readonly provider: string;
}

export const createUser = async (data: CreateUserData) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: data.id } });

  if (user) return user;
  return await prisma.user.create({ data });
};

export const deleteUserAccount = async () => {
  console.log('deleteUserAccount()');
  const session = await getSessionOrThrow();
  const userId = session.user.id;

  console.log('deleteUserAccount() - userId: ', userId);

  const prisma = new PrismaClient();
  await prisma.user.delete({ where: { id: userId } });

  const supabase = createServerActionClient<Database>({ cookies });
  const { error } = await supabase.auth.signOut();
  console.log('deleteUserAccount() - error: ', error);
};
