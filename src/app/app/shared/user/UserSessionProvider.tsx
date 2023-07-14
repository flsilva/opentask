'use client';

import { createContext, useState } from 'react';
import { ChildrenProps } from '@/app/shared/ui/ChildrenProps';
import { UserData } from './UserData';

interface UserSessionProviderProps extends ChildrenProps {
  readonly user: UserData;
}

interface UserSession {
  readonly user?: UserData;
  readonly logout: () => void;
}

export const UserSessionContext = createContext<UserSession>({ logout: () => {} });

export default function UserSessionProvider({
  children,
  user: loggedUser,
}: UserSessionProviderProps) {
  const logout = () => {
    setUserSession({ logout });
  };

  const initUserSession: UserSession = {
    user: loggedUser,
    logout,
  };
  const [userSession, setUserSession] = useState(initUserSession);

  return <UserSessionContext.Provider value={userSession}>{children}</UserSessionContext.Provider>;
}
