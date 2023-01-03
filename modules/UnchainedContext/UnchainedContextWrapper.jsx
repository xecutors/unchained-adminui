import React, { useMemo } from 'react';

import UnchainedContext from './UnchainedContext';
import useShopInfo from '../common/hooks/useShopInfo';

const UnchainedContextWrapper = ({ children }) => {
  const { shopInfo } = useShopInfo();
  console.log(
    shopInfo?.adminUiConfig?.customProperties?.reduce(
      (prev, { entityName, inlineFragment }) => ({
        ...prev,
        [entityName]: inlineFragment,
      }),
      {},
    ),
  );
  return (
    <UnchainedContext.Provider
      value={useMemo(() => {
        return {
          customProperties: shopInfo?.adminUiConfig?.customProperties?.reduce(
            (prev, { entityName, inlineFragment }) => ({
              ...prev,
              [entityName]: inlineFragment,
            }),
            {},
          ),
        };
      }, [shopInfo])}
    >
      {children}
    </UnchainedContext.Provider>
  );
};

export default UnchainedContextWrapper;
