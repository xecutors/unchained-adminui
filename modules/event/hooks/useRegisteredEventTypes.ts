import { useQuery, gql } from '@apollo/client';
import {
  IRegisteredEventTypeQuery,
  IRegisteredEventTypeQueryVariables,
} from '../../../gql/types';

export const RegisteredEventTypeQuery = gql`
  query RegisteredEventType {
    registeredEvents: __type(name: "EventType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useRegisteredEventTypes = () => {
  const { data, loading, error } = useQuery<
    IRegisteredEventTypeQuery,
    IRegisteredEventTypeQueryVariables
  >(RegisteredEventTypeQuery);

  const registeredEventTypes = data?.registeredEvents?.options || [];

  return {
    registeredEventTypes,
    loading,
    error,
  };
};

export default useRegisteredEventTypes;
