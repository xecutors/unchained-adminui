import React from 'react';

const UnchainedContext = React.createContext<{
  customProperties: Record<string, string>;
}>({
  customProperties: {},
});

export default UnchainedContext;
