import { useQuery, gql } from '@apollo/client';

export const EventsTypeQuery = gql`
  query EventsType {
    eventTypes: __type(name: "EventType") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

const useEventTypes = () => {
  const { data, loading, error } = useQuery(EventsTypeQuery);

  const eventsType = data?.eventTypes?.options || [];

  return {
    eventsType,
    loading,
    error,
  };
};

export default useEventTypes;
