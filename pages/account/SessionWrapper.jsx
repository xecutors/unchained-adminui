import React from 'react';
import useCurrentUser from '../../modules/accounts/hooks/useCurrentUser';
import Loading from '../../modules/common/components/Loading';

const SessionWrapper = ({ children }) => {
  const { currentUser, loading } = useCurrentUser();

  return loading ? (
    <Loading />
  ) : (
    React.cloneElement(children, {
      allowedActions: currentUser?.allowedActions,
    })
  );
};

export default SessionWrapper;
