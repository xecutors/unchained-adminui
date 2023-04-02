import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import getConfig from 'next/config';
import useCurrentUser from '../accounts/hooks/useCurrentUser';
import Loading from '../common/components/Loading';
import AuthContext from './AuthContext';

import loadRoleConfig from '../common/utils/loadRoleConfig';

const {
  publicRuntimeConfig: { restrictNonAdmin },
} = getConfig();

const AuthWrapper = ({ children, apolloClient, componentName }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const [roleConfig, setConfig] = useState();
  console.log('ererererererrrrrrrrrrrrr ererer        ', roleConfig);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const config = await loadRoleConfig();
        setConfig(config);
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    }

    fetchConfig();
  }, []);

  const isAuthenticated = (user) => {
    /* if (!isUserAuthenticated) return true;
    return isUserAuthenticated(user); */
  };

  const isAdmin = (user) => {
    /* if (!isUserAdmin) return true;
    return isUserAdmin(user); */
  };

  const hasRole = (action, component = null) => {
    /*     if (!checkRole) return true;
    return checkRole(currentUser, action, apolloClient, {
      componentName: component,
      router,
      action,
    }); */
  };

  const hasAccess = ({ user, action } = {}) => {
    /*    if (!checkAccess) return true;
    return checkAccess(user, action, apolloClient, {
      router,
      componentName,
    }); */
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
