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
  // const setAuthContext = (id, roles) => {
  //   // localStorage.setItem(id, roles);
  // };
  const isAuthenticated = () => {
    const userId = getUserId();
    // const roles = localStorage.getItem(id || userId);
    // // empty string means array since setting array to local storage is transformed to empty string
    // if (!roles && roles !== '') return false;
    // return roles?.split(',')?.filter(Boolean);
    return !!userId;
  };

  const isAdmin = () => {
    // return isAuthenticated(id) && isAuthenticated(id)?.length === 0;
    return isAuthenticated() && currentUser?.allowedActions.length === 0;
  };

  // const hasRole = (role) => {
  //   if (role === 'UNRESTRICTED') return true;
  //   const userId = getUserId();
  //   const roles = isAuthenticated(userId);
  //   if (roles === false) return false;
  //   return isAdmin(userId) || roles.includes(role);
  // };

  const hasRole = (role) => {
    if (isAdmin()) {
      return true;
    }
    if (currentUser?.allowedActions.includes(role)) {
      return true;
    }
    return false;
  };

  const hasAccess = (id) => {
    if (!id && !UnrestrictedPages.includes(router.pathname)) return false;
    // const userRoles = isAuthenticated(id);
    if (
      ROUTE_ROLES[router.pathname] === 'UNRESTRICTED' ||
      isAdmin()
      // (userRoles || [])?.includes(ROUTE_ROLES[router.pathname])
    )
      return true;
    return false;
  };
  // const resetAuth = (id) => {
  //   // localStorage.setItem(id, '');
  // };

  const ctx = useMemo(
    () => ({
      // setAuthContext
      isAuthenticated,
      hasAccess,
      // resetAuth,
      isAdmin,
      hasRole,
    }),
    [currentUser],
  );

  useEffect(() => {
    if (!loading) {
      if (hasAccess(currentUser?._id)) {
        if (!hasAccess(currentUser?._id)) {
          router.replace('/403');
        }
      } else if (!hasAccess(currentUser?._id)) {
        router.replace('/log-in');
      }
    }
  }, [loading]);

  return (
    <>
      <AuthContext.Provider value={ctx}>
        {loading ? <Loading /> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthWrapper;
