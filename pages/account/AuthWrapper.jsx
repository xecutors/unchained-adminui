import React from 'react';

import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import Loading from '../../modules/common/components/Loading';

const AuthWrapper = ({ children }) => {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return <Loading />;

  return React.cloneElement(children, {
    allowedActions: currentUser?.allowedActions,
  });
};

export default AuthWrapper;
