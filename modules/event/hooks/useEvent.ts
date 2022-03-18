import { useQuery, gql } from '@apollo/client';
import EventFragment from '../fragments/EventFragment';

export const EventQuery = gql`
  query Event($eventId: ID!) {
    event(eventId: $eventId) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

const useEnrollments = ({ eventId = null } = {}) => {
  const { data, loading, error } = useQuery(EventQuery, {
    skip: !eventId,
    variables: { eventId },
  });
  const event = data?.event || [];

  return {
    event,
    loading,
    error,
  };
};

export default useEnrollments;
