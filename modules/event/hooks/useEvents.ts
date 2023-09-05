import { useQuery, gql } from '@apollo/client';
import {
  IEventsQuery,
  IEventsQueryVariables,
  ISortDirection,
  ISortOptionInput,
} from '../../../gql/types';
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
  sort: sortOptions = [],
  queryString = null,
}: IEventsQueryVariables = {}) => {
  const { data, loading, error } = useQuery<
    IEventsQuery,
    IEventsQueryVariables
  >(EventQuery, {
    variables: {
      types,
      limit,
      offset,
      sort: sortOptions?.length
        ? sortOptions
        : [{ key: 'created', value: ISortDirection.Desc }],
      queryString,
    },
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
