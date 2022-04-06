import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import { getUserId } from '../accounts/utils/store';
import Loading from '../common/components/Loading';
import { UnrestrictedPages } from '../common/data/miscellaneous';
import { ROUTE_ROLES } from '../common/data/roles';

import AuthContext from './AuthContext';

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const setAuthContext = (id, roles) => {
    localStorage.setItem(id, roles);
  };
  const isAuthenticated = (id) => {
    const roles = localStorage.getItem(id);
    // empty string means array since setting array to local storage is transformed to empty string
    if (!roles && roles !== '') return false;
    return roles?.split(',')?.filter(Boolean);
  };

  const isAdmin = (id) => {
    return isAuthenticated(id) && isAuthenticated(id)?.length === 0;
  };

  const hasRole = (role) => {
    if (role === 'UNRESTRICTED') return true;
    const userId = getUserId();
    const roles = isAuthenticated(userId);
    if (roles === false) return false;
    return isAdmin(userId) || roles.includes(role);
  };

  const checkAccess = (id) => {
    if (!id && !UnrestrictedPages.includes(router.pathname)) return false;
    const userRoles = isAuthenticated(id);
    if (
      ROUTE_ROLES[router.pathname] === 'UNRESTRICTED' ||
      isAdmin(id) ||
      userRoles?.includes(ROUTE_ROLES[router.pathname])
    )
      return true;
    return false;
  };
  const resetAuth = (id) => {
    localStorage.setItem(id, null);
  };

  const ctx = useMemo(
    () => ({
      setAuthContext,
      isAuthenticated,
      checkAccess,
      resetAuth,
      isAdmin,
      hasRole,
    }),
    [],
  );

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated(currentUser?._id)) {
        if (!checkAccess(currentUser?._id)) {
          router.replace('/403');
        }
      } else {
        router.replace('/log-in');
      }
    }
  }, [currentUser, loading]);

  return (
    <>
      <AuthContext.Provider value={ctx}>
        {loading ? <Loading /> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthWrapper;
