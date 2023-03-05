import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import getConfig from 'next/config';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import Loading from '../common/components/Loading';
import AuthContext from './AuthContext';
import {
  checkAccess,
  checkRole,
  isUserAdmin,
  isUserAuthenticated,
} from '../../app-permissions.config';

const {
  publicRuntimeConfig: { restrictNonAdmin },
} = getConfig();

const AuthWrapper = ({ children, apolloClient, componentName }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const isAuthenticated = (user) => {
    return isUserAuthenticated(user);
  };

  const isAdmin = (user) => {
    return isUserAdmin(user);
  };

  const hasRole = (role, action = null) => {
    return checkRole(currentUser, role, apolloClient, {
      componentName,
      router,
      action,
    });
  };

  const hasAccess = ({ user, action } = {}) => {
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
  }, [currentUser, router]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated(currentUser)) {
        if (!hasAccess({ user: currentUser })) {
          router.replace('/403');
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

  return (
    <AuthContext.Provider value={ctx}>
      {loading || !hasAccess({ user: currentUser }) ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
