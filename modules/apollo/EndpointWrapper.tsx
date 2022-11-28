import { useState, createContext, useMemo } from 'react';
import {
  getEndpoint as getEndpointFromSession,
  setEndpoint as setEndpointInSession,
} from '../common/utils/utils';

const EndpointContext = createContext<{
  setEndpoint: typeof setEndpointInSession;
  endpoint: string;
}>({
  setEndpoint: () => null,
  endpoint: null,
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
    return null;
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

const EndpointWrapper = ({ children, setEndpoint, endpoint }) => {
  const contextValue = useMemo(
    () => ({
      setEndpoint,
      endpoint,
    }),
    [endpoint, setEndpoint],
  );

  return (
    <EndpointContext.Provider value={contextValue}>
      {children}
    </EndpointContext.Provider>
  );
};

export { EndpointContext, useSetEndpointContext };
export default EndpointWrapper;
