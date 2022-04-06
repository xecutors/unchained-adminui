import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { ROUTE_ROLES } from '../common/data/roles';

import AuthContext from './AuthContext';

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const setAuthContext = (id, roles) => {
    localStorage.setItem(id, roles);
  };
  const isAuthenticated = (id) => {
    return !!localStorage.getItem(id);
  };

  const checkAccess = (id) => {
    if (!id) return false;
    const userRoles =
      localStorage.getItem(id) && localStorage.getItem(id)?.split(',');

    if (
      ROUTE_ROLES[router.pathname] === 'UNRESTRICTED' ||
      (userRoles !== false &&
        userRoles.includes(ROUTE_ROLES[router.pathname])) ||
      userRoles?.length === 0
    )
      return true;

    router.push('/403');
    return false;
  };
  const restAuth = (id) => {
    localStorage.setItem(id, null);
  };

  const ctx = useMemo(
    () => ({ setAuthContext, isAuthenticated, checkAccess, restAuth }),
    [],
  );

  return (
    <>
      <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthWrapper;
