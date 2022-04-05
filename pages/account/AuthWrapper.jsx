import { useRouter } from 'next/router';
import React from 'react';
import useCurrentRoles from '../../modules/accounts/hooks/useCurrentRoles';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import Loading from '../../modules/common/components/Loading';
import { ROUTE_ROLES } from '../../modules/common/data/roles';

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const { hasRole } = useCurrentRoles();
  const privilege = ROUTE_ROLES[router.pathname];

  if (loading) return <Loading />;

  if (privilege !== undefined && !hasRole(privilege)) router.push('/403');
  return React.cloneElement(children, {
    allowedActions: currentUser?.allowedActions,
  });
};

export default AuthWrapper;
