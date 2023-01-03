import React from 'react';

const UnchainedContext = React.createContext<{
  customProperties: Record<string, string>;
  convertFragmentToKeyValuePair: Function;
}>({
  customProperties: {},
  convertFragmentToKeyValuePair: () => null,
});

export default UnchainedContext;
