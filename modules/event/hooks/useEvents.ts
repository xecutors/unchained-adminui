import { useQuery, gql } from '@apollo/client';
import EventFragment from '../fragments/EventFragment';

export const EventQuery = gql`
  query Events($type: String, $limit: Int, $offset: Int, $queryString: String) {
    events(
      type: $type
      limit: $limit
      offset: $offset
      queryString: $queryString
    ) {
      ...EventFragment
    }
    eventsCount
  }
  ${EventFragment}
`;

const useEvents = ({
  type = null,
  limit = 20,
  offset = 0,
  queryString = '',
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(EventQuery, {
    variables: { type, limit, offset, queryString },
  });
  const events = data?.events || [];
  const eventsCount = data?.eventsCount;

  const hasMore = events?.length < eventsCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: events.length },
    });
  };

  return {
    events,
    hasMore,
    loadMore,
    eventsCount,
    loading,
    error,
  };
};

export default useEvents;
