import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo } from 'react';
import getConfig from 'next/config';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import AuthContext from './AuthContext';

import loadRoleConfig from '../common/utils/loadRoleConfig';
import Loading from '../common/components/Loading';

const {
  publicRuntimeConfig: { restrictNonAdmin },
} = getConfig();

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const {
    checkAccess,
    isUserAuthenticated,
    isUserAdmin,
    checkRole,
    isPublicOnlyPage,
  } = useMemo(() => loadRoleConfig(), []);

  const ctx = useMemo(() => {
    return {
      isAdmin: () => {
        if (!isUserAdmin) return false;
        return isUserAdmin(currentUser);
      },
      hasRole: (action) => {
        if (!checkRole) return false;
        return checkRole(currentUser, action);
      },
    };
  }, [currentUser, checkRole, isUserAdmin]);

  useEffect(() => {
    if (loading) return;

    let nextPathname = undefined;
    if (isUserAuthenticated(currentUser)) {
      if (!checkAccess(currentUser, router.pathname)) {
        nextPathname = '/403';
      } else if (isPublicOnlyPage(router.pathname)) {
        nextPathname = '/';
      } else if (
        !isUserAdmin(currentUser) &&
        restrictNonAdmin &&
        router.pathname !== '/423'
      ) {
        nextPathname = '/423';
      }
    } else if (!checkAccess(currentUser)) {
      nextPathname = '/log-in';
    }

    if (nextPathname && router.pathname !== nextPathname) {
      console.log('Redirecting to:', nextPathname);
      router.replace(nextPathname);
    }
  }, [
    currentUser?._id,
    loading,
    isUserAdmin,
    isUserAuthenticated,
    isPublicOnlyPage,
    restrictNonAdmin,
    router,
    checkAccess,
  ]);

  return (
    <AuthContext.Provider value={ctx}>
      {loading && !currentUser ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
