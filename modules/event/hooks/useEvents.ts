import { useQuery, gql } from '@apollo/client';
import EventFragment from '../fragments/EventFragment';

export const EventQuery = gql`
  query Events(
    $types: [String!]
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
    $queryString: String
  ) {
    events(
      types: $types
      limit: $limit
      offset: $offset
      sort: $sort
      queryString: $queryString
    ) {
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
  queryString = null,
} = {}) => {
  const { data, loading, error } = useQuery(EventQuery, {
    variables: { types, limit, offset, sort, queryString },
  });
  const events = data?.events || [];
  const eventsCount = data?.eventsCount;

  const hasMore = events?.length < eventsCount;

  return {
    events,
    hasMore,
    eventsCount,
    loading,
    error,
  };
};

export default useEvents;
