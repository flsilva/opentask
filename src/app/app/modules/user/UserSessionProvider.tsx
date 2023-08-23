'use client';

import { createContext, useState } from 'react';
import { ChildrenProps } from '@/app/modules/common/ChildrenProps';
import { Session } from '@supabase/supabase-js';

interface UserSessionProviderProps extends ChildrenProps {
  readonly session: Session;
}

interface WrappedUserSession {
  readonly getUserName: () => string;
  readonly logout: () => void;
  readonly session?: Session;
}

export const UserSessionContext = createContext<WrappedUserSession>({
  getUserName: () => '',
  logout: () => {},
});

export default function UserSessionProvider({ children, session }: UserSessionProviderProps) {
  const logout = () => {
    setWrappedUserSession({ getUserName, logout });
  };

  const getUserName = () => {
    if (typeof session.user.user_metadata.name === 'string') return session.user.user_metadata.name;
    if (typeof session.user.email === 'string') return session.user.email;
    return '';
  };

  const initWrappedSession: WrappedUserSession = {
    getUserName,
    logout,
    session,
  };
  const [wrappedUserSession, setWrappedUserSession] = useState(initWrappedSession);

  return (
    <UserSessionContext.Provider value={wrappedUserSession}>{children}</UserSessionContext.Provider>
  );
}
