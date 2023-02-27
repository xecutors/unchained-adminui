import { useState, createContext, useContext } from 'react';
import getConfig from 'next/config';
import {
  getEndpoint as getEndpointFromSession,
  setEndpoint as setEndpointInSession,
} from '../common/utils/utils';

const {
  publicRuntimeConfig: { publicGraphQLEndpoint },
} = getConfig();

const EndpointContext = createContext<{
  setEndpoint: typeof setEndpointInSession;
  endpoint: string;
}>({
  setEndpoint: () => null,
  endpoint: publicGraphQLEndpoint || 'http://localhost:4010/graphql',
});

const useSetEndpointContext = () => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = getEndpointFromSession();
      if (value) {
        return value;
      }
    } catch (err) {
      /* */
    }
    return publicGraphQLEndpoint;
  });

  return {
    setEndpoint: (newValue) => {
      try {
        setEndpointInSession(newValue);
      } catch (err) {
        /* */
      }
      setStoredValue(newValue);
      return newValue;
    },
    endpoint: storedValue,
  };
};

const useEndpoint = () => {
  return useContext(EndpointContext);
};

export { EndpointContext, useSetEndpointContext, useEndpoint };
