import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import AuthContext from './AuthContext';
import loadRoleConfig from '../common/utils/loadRoleConfig';
import { useApolloClient } from '@apollo/client';

const AuthWrapper = ({ children, componentName }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const apolloClient = useApolloClient();

  const {
    checkAccess,
    isUserAuthenticated,
    isUserAdmin,
    checkRole,
    isPublicOnlyPage,
  } = loadRoleConfig();

  const isAuthenticated = (user) => {
    if (!isUserAuthenticated) return false;
    return isUserAuthenticated(user);
  };

  const isAdmin = (user) => {
    if (!isUserAdmin) return false;
    return isUserAdmin(user);
  };

  const hasRole = (action, component = null) => {
    if (!checkRole) return false;
    return checkRole(currentUser, action, apolloClient, {
      componentName: component,
      router,
      action,
    });
  };

  const hasAccess = ({ user, action = '' }) => {
    if (!checkAccess) return false;
    return checkAccess(user, action, apolloClient, {
      router,
      componentName,
    });
  };

  const ctx = useMemo(() => {
    return {
      isAuthenticated,
      hasAccess,
      isAdmin,
      hasRole,
    };
  }, [currentUser, router.pathname]);

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated(currentUser)) {
      if (!hasAccess({ user: currentUser })) {
        router.replace('/403');
      } else if (isPublicOnlyPage(router)) {
        router.replace('/');
      } else if (
        !isAdmin(currentUser) &&
        !!process.env.NEXT_PUBLIC_ONLY_ADMIN &&
        router.pathname !== '/423'
      ) {
        router.replace('/423');
      }
    } else if (!hasAccess({ user: currentUser })) {
      router.replace('/log-in');
    }
  }, [router, currentUser, hasAccess, isAuthenticated, loading]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthWrapper;
