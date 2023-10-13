'use client';

import { createContext, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { UserDto } from './UserRepository';

interface UserProviderProps extends ChildrenProps {
  readonly session: Session;
}

export const UserContext = createContext<UserDto>({ name: '', email: '' });

export const UserProvider = ({ children, session }: UserProviderProps) => {
  const getUserName = () => {
    if (!session) return '';
    const { user } = session;
    if (!user) return '';

    const { user_metadata } = user;

    if (user_metadata && typeof user_metadata.name === 'string') return user_metadata.name;
    return getUserEmail();
  };

  const getUserEmail = () => {
    if (!session) return '';
    const { user } = session;
    if (!user) return '';

    if (typeof user.email === 'string') return user.email;
    return '';
  };

  const [user, setUser] = useState({ name: getUserName(), email: getUserEmail() });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
