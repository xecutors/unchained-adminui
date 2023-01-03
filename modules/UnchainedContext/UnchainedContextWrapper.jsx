import React, { useMemo } from 'react';

import UnchainedContext from './UnchainedContext';
import useShopInfo from '../common/hooks/useShopInfo';

function getKeyValuePare(selectionSet) {
  return selectionSet.reduce((acc, selection) => {
    switch (selection.kind) {
      case 'InlineFragment': {
        const pairs = getKeyValuePare(selection.selectionSet.selections);
        Object.assign(acc, pairs);
        break;
      }
      case 'Field': {
        const key = selection.name.value;
        let value;
        if (selection.selectionSet) {
          value = getKeyValuePare(selection.selectionSet.selections);
        } else {
          value = selection.value;
        }
        acc[key] = value;
        break;
      }
      default: {
        break;
      }
    }
    return acc;
  }, {});
}

function convertFragmentToKeyValuePair(fragment) {
  return getKeyValuePare(fragment?.definitions[0]?.selectionSet?.selections);
}

const UnchainedContextWrapper = ({ children }) => {
  const { shopInfo } = useShopInfo();

  return (
    <UnchainedContext.Provider
      value={useMemo(() => {
        const customProperties =
          shopInfo?.adminUiConfig?.customProperties?.reduce(
            (prev, { entityName, inlineFragment }) => ({
              ...prev,
              [entityName]: inlineFragment,
            }),
            {},
          );
        return {
          customProperties,
          convertFragmentToKeyValuePair,
        };
      }, [shopInfo])}
    >
      {children}
    </UnchainedContext.Provider>
  );
};

export default UnchainedContextWrapper;
