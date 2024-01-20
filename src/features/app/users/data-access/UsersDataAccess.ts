'use server';

import { cookies } from 'next/headers';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { prisma } from '@/features/shared/data-access/prisma';
import {
  ServerResponse,
  createServerErrorResponse,
  createServerSuccessResponse,
} from '@/features/shared/data-access/ServerResponse';
import { genericAwareOfInternalErrorMessage } from '@/features/shared/ui/error/errorMessages';

export interface UserDto {
  readonly email: string;
  readonly name: string;
}

export interface ServerSideUserDto {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly timeZone: string;
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
    console.error(error);

    // return the real error (the session has probably expired).
    return createServerErrorResponse<undefined>(error);
  }

  try {
    await prisma.user.delete({ where: { id } });
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
    return createServerSuccessResponse(undefined);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse<undefined>(genericAwareOfInternalErrorMessage);
  }
};

const getUserSession = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user || typeof session.user.id !== 'string' || session.user.id === '') {
    throw new Error('Your session has expired. Please sign in again.');
  }

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
 * We don't want to expose user's id to the client because it doesn't need it,
 * so we have this extra function to be used server-side only.
 */
export const getServerSideUser = async () => {
  const {
    user: { email, id, user_metadata },
  } = await getUserSession();
  const _user = await prisma.user.findUnique({ where: { id } });
  const timeZone = _user && _user.timeZone ? _user.timeZone : '';
  const name = user_metadata && typeof user_metadata.name === 'string' ? user_metadata.name : email;

  const userDto: ServerSideUserDto = {
    email: email || '',
    id: id || '',
    name: name || '',
    timeZone,
  };

  return userDto;
};
/**/

export const isUserAuthenticated = async () => {
  let isAuthenticated = true;
  try {
    await getUserSession();
  } catch {
    isAuthenticated = false;
  }

  return isAuthenticated;
};

export const signOut = async () => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const updateTimeZone = async (timeZone: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
  } catch (error) {
    console.error(error);
    return createServerErrorResponse('Invalid time zone.');
  }

  try {
    const { id } = await getServerSideUser();

    const result = await prisma.user.update({
      where: { id },
      data: { timeZone },
    });

    return createServerSuccessResponse(result);
  } catch (error) {
    console.error(error);

    // return a friendly error message instead of the (unknown) real one.
    return createServerErrorResponse(genericAwareOfInternalErrorMessage);
  }
};
