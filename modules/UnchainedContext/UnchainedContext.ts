import React from 'react';

const UnchainedContext = React.createContext<{
  customProperties: any[];
}>({
  customProperties: [],
});

export default UnchainedContext;
