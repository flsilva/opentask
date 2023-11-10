'use server';

import { cookies } from 'next/headers';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '@/modules/app/shared/data-access/prisma';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/modules/app/shared/errors/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/modules/app/shared/errors/errorMessages';

export interface UserDto {
  readonly email: string;
  readonly name: string;
}

export const deleteUserAccount = async (
  prevResponse: ServerResponse<undefined> | undefined,
  formData: FormData,
) => {
  let id;
  try {
    ({
      user: { id },
    } = await getUserSession());
  } catch (error) {
    // LOG ERROR HERE

    // We want to return the real error (the session has probably expired).
    return createServerErrorResponse(error);
  }

  try {
    await prisma.user.delete({ where: { id } });
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
    return createServerSuccessResponse(undefined);
  } catch (error) {
    // LOG ERROR HERE

    // We want to return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};

const getUserSession = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
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
