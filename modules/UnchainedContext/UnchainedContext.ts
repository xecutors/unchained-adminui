import React from 'react';

const UnchainedContext = React.createContext<{
  customProperties: Record<string, string>;
  hydrateFragment: Function;
}>({
  customProperties: {},
  hydrateFragment: () => null,
});

export default UnchainedContext;
