'use client';

import { createContext } from 'react';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { UserDto } from './UserRepository';

interface UserProviderProps extends ChildrenProps {
  readonly user: UserDto;
}

export const UserContext = createContext<UserDto>({ name: '', email: '' });

export const UserProvider = ({ children, user }: UserProviderProps) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);
