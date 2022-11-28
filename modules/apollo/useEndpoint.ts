import { useContext } from 'react';
import { EndpointContext } from './EndpointWrapper';

const useEndpoint = () => {
  return useContext(EndpointContext);
};

export default useEndpoint;
