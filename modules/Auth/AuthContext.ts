import React from 'react';

export type SetAuth = (
  // eslint-disable-next-line no-undef
  userId: string,
) => Promise<boolean>;

export type Auth = (id: string) => boolean;
export type AuthState = (id: string) => boolean | string[];
export type AuthReset = (id: string) => void;
const AuthContext = React.createContext<{
  setAuthContext: SetAuth;
  isAuthenticated: AuthState;
  isAdmin: Auth;
  checkAccess: () => boolean;
  resetAuth?: AuthReset;
}>({
  setAuthContext: () => {
    throw new Error('No AuthContext registered');
  },
  isAuthenticated: () => false,
  isAdmin: () => false,
  checkAccess: () => false,
  resetAuth: (id) => {
    localStorage.setItem(id, null);
  },
});

export default AuthContext;
