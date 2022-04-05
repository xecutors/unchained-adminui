import { useEffect } from 'react';

import useAuth from './useAuth';

const AccessControl = ({ userId, children }) => {
  const { checkAccess } = useAuth();

  useEffect(() => {
    if (userId) checkAccess(userId);
  }, [userId]);

  return children;
};

export default AccessControl;
