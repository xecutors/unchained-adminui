import React, { useMemo } from 'react';

import { gql } from '@apollo/client';
import UnchainedContext from './UnchainedContext';
import useShopInfo from '../common/hooks/useShopInfo';

const assignObjectValue = (source, target) => {
  const result = {};
  const keys = Object.keys(target);
  keys.forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (Array.isArray(targetValue)) {
      result[key] = targetValue.map((item, i) =>
        assignObjectValue(sourceValue[i], item),
      );
    } else if (typeof targetValue === 'object') {
      result[key] = assignObjectValue(sourceValue, targetValue);
    } else {
      result[key] = sourceValue;
    }
  });
  return result;
};

const getKeyValuePair = (selectionSet) => {
  return selectionSet.reduce((acc, selection) => {
    switch (selection.kind) {
      case 'InlineFragment': {
        const pairs = getKeyValuePair(selection.selectionSet.selections);
        Object.assign(acc, pairs);
        break;
      }
      case 'Field': {
        const key = selection.name.value;
        let value;
        if (selection.selectionSet) {
          value = getKeyValuePair(selection.selectionSet.selections);
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
};

const hydrateFragment = (fragment, source) => {
  if (!fragment || !source) return null;
  const queryFragment = gql`fragment CustomProperty on ExtendedUnchainedSchema { ${fragment}  }`;
  const fragmentKeys = getKeyValuePair(
    queryFragment?.definitions[0]?.selectionSet?.selections,
  );

  return assignObjectValue(source, fragmentKeys);
};

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
          hydrateFragment,
        };
      }, [shopInfo])}
    >
      {children}
    </UnchainedContext.Provider>
  );
};

export default UnchainedContextWrapper;
