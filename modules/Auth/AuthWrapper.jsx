import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import Loading from '../common/components/Loading';
import { UnrestrictedPages } from '../common/data/miscellaneous';
import { ROUTE_ROLES } from '../common/data/roles';

import AuthContext from './AuthContext';

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const isAuthenticated = () => {
    return !!currentUser?._id;
  };

  const isAdmin = () => {
    return currentUser?.allowedActions.length === 0;
  };

  const hasRole = (role) => {
    if (isAdmin()) {
      return true;
    }
    if (currentUser?.allowedActions.includes(role)) {
      return true;
    }
    return false;
  };

  const hasAccess = () => {
    if (!currentUser?._id && !UnrestrictedPages.includes(router.pathname))
      return false;
    if (
      ROUTE_ROLES[router.pathname] === 'UNRESTRICTED' ||
      isAdmin() ||
      (currentUser?.allowedActions || [])?.includes(
        ROUTE_ROLES[router.pathname],
      )
    )
      return true;
    return false;
  };

  const ctx = useMemo(
    () => ({
      isAuthenticated,
      hasAccess,
      isAdmin,
      hasRole,
    }),
    [currentUser],
  );

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated()) {
        if (!hasAccess()) {
          router.replace('/403');
        }
      } else if (!hasAccess()) {
        router.replace('/log-in');
      }
    }
  }, [currentUser, loading, hasAccess, isAuthenticated, router]);

  return (
    <>
      <AuthContext.Provider value={ctx}>
        {loading ? <Loading /> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthWrapper;
