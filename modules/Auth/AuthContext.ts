import React from 'react';

export type Auth = (id: string) => boolean;
export type AuthState = (id?: string) => boolean | string[];
export type AuthReset = (id: string) => void;
const AuthContext = React.createContext<{
  isAuthenticated: AuthState;
  isAdmin: Auth;
  hasAccess: () => boolean;
  hasRole: Auth;
}>({
  isAuthenticated: () => false,
  isAdmin: () => false,
  hasRole: () => false,
  hasAccess: () => false,
});

export default AuthContext;
