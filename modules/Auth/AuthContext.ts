import React from 'react';

export type SetAuth = (
  // eslint-disable-next-line no-undef
  userId: string,
) => Promise<boolean>;

export type Auth = (id: string) => boolean;

const AuthContext = React.createContext<{
  setAuthContext: SetAuth;
  isAuthenticated: Auth;
  checkAccess: () => boolean;
  resetAuth?: (id: string) => void;
}>({
  setAuthContext: () => {
    throw new Error('No AuthContext registered');
  },
  isAuthenticated: () => false,
  checkAccess: () => false,
  resetAuth: (id) => {
    localStorage.setItem(id, null);
  },
});

export default AuthContext;
