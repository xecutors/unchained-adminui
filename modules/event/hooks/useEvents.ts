import { useQuery, gql } from '@apollo/client';
import EventFragment from '../fragments/EventFragment';

export const EventQuery = gql`
  query Events(
    $types: [String!]
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    events(types: $types, limit: $limit, offset: $offset, sort: $sort) {
      ...EventFragment
    }
    eventsCount
  }
  ${EventFragment}
`;

const useEvents = ({
  types = null,
  limit = 20,
  offset = 0,
  sort = [],
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(EventQuery, {
    variables: { types, limit, offset, sort },
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
