import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import getConfig from 'next/config';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import AuthContext from './AuthContext';

import loadRoleConfig from '../common/utils/loadRoleConfig';

const {
  publicRuntimeConfig: { restrictNonAdmin },
} = getConfig();

const AuthWrapper = ({ children, apolloClient, componentName }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const {
    checkAccess,
    isUserAuthenticated,
    isUserAdmin,
    checkRole,
    isPublicOnlyPage,
  } = useMemo(() => loadRoleConfig(), []);

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
    console.log('ppppppppppppppppp   ', user);
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
    if (!loading && currentUser !== undefined) {
      if (isAuthenticated(currentUser)) {
        if (!hasAccess({ user: currentUser })) {
          router.replace('/403');
        } else if (isPublicOnlyPage(router)) {
          router.replace('/');
        } else if (
          !isAdmin(currentUser) &&
          restrictNonAdmin &&
          router.pathname !== '/423'
        ) {
          router.replace('/423');
        }
      } else if (!hasAccess({ user: currentUser })) {
        router.replace('/log-in');
      }
    }
  }, [router, currentUser?._id, hasAccess, isAuthenticated, loading]);

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthWrapper;
