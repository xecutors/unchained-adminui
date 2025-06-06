import React from 'react';
import { IUser } from '../../gql/types';

type Auth = (currentUser?: IUser) => boolean;
type AuthState = (user?: IUser) => boolean | string[];
const AuthContext = React.createContext<{
  isAuthenticated: AuthState;
  isAdmin: Auth;
  hasAccess: (param: { user: IUser; actionName?: string }) => boolean;
  hasRole: (actionName: string, componentName?: string) => boolean;
}>({
  isAuthenticated: () => false,
  isAdmin: () => false,
  hasRole: () => false,
  hasAccess: () => false,
});

export default AuthContext;
