import React from 'react';

export type SetAuth = (
  // eslint-disable-next-line no-undef
  userId: string,
) => Promise<boolean>;

export type Auth = (id: string) => boolean;
export type AuthState = (id?: string) => boolean | string[];
export type AuthReset = (id: string) => void;
const AuthContext = React.createContext<{
  setAuthContext: SetAuth;
  isAuthenticated: AuthState;
  isAdmin: Auth;
  hasAccess: () => boolean;
  resetAuth?: AuthReset;
  hasRole: Auth;
}>({
  setAuthContext: () => {
    throw new Error('No AuthContext registered');
  },
  isAuthenticated: () => false,
  isAdmin: () => false,
  hasRole: () => false,
  hasAccess: () => false,
  resetAuth: () => {
    throw new Error('No AuthContext registered');
  },
});

export default AuthContext;
