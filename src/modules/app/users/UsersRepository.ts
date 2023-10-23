'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '@/modules/app/shared/data-access/prisma';

export interface UserDto {
  readonly email: string;
  readonly name: string;
}

export const deleteUserAccount = async () => {
  const {
    user: { id },
  } = await getUserSession();

  try {
    await prisma.user.delete({ where: { id } });
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

const getUserSession = async () => {
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

/*
 * We don't expose user's id to the client because it doesn't need it.
 */
export const getUser = async () => {
  const {
    user: { user_metadata, email },
  } = await getUserSession();
  const name = user_metadata && typeof user_metadata.name === 'string' ? user_metadata.name : email;

  const userDto: UserDto = {
    email: email || '',
    name: name || '',
  };

  return userDto;
};

/*
 * We have this extra function to be called by server side code only.
 */
export const getUserId = async () => {
  const {
    user: { id },
  } = await getUserSession();
  return id;
};

export const signOut = async () => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};
