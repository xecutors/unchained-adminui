import React from 'react';

export type Auth = (actionName: string) => boolean;
export type AuthState = () => boolean | string[];
export type AuthReset = () => void;
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
