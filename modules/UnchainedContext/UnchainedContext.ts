import React from 'react';

const UnchainedContext = React.createContext<{
  customProperties: Record<string, string>;
  hydrateFragment: Function;
}>({
  customProperties: {},
  // eslint-disable-next-line no-unused-vars
  hydrateFragment: (fragment: string, data: any) => null,
});

export default UnchainedContext;
