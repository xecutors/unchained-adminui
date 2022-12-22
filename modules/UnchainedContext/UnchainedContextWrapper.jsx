import React, { useMemo } from 'react';

import UnchainedContext from './UnchainedContext';
import useShopInfo from '../common/hooks/useShopInfo';

const UnchainedContextWrapper = ({ children }) => {
  const { shopInfo } = useShopInfo();
  return (
    <UnchainedContext.Provider
      value={useMemo(() => {
        return {
          customProperties: shopInfo?.adminUiConfig?.customProperties,
        };
      }, [shopInfo])}
    >
      {children}
    </UnchainedContext.Provider>
  );
};

export default UnchainedContextWrapper;
