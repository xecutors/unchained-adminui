import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQueueQuery = gql`
  query WorkQueue(
    $queryString: String
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]
    $types: [WorkType!]
    $created: DateFilterInput
    $sort: [SortOptionInput!]
  ) {
    workQueue(
      queryString: $queryString
      offset: $offset
      limit: $limit
      status: $status
      types: $types
      created: $created
      sort: $sort
    ) {
      ...WorkFragment
    }
    activeWorkTypes
    workQueueCount(
      status: $status
      types: $types
      created: $created
      queryString: $queryString
    )
  }
  ${WorkFragment}
`;

const useWorkQueue = ({
  queryString = '',

  limit = 50,
  status = undefined,
  types = undefined,
  created = null,
  sort: sortOptions = [],
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(WorkQueueQuery, {
    pollInterval: 2000,
    variables: {
      queryString,
      offset: 0,
      limit,
      status,
      types,
      created: Object.fromEntries(
        Object.entries(created || {})
          .filter(([, value]) => value)
          .map(([key, value]) => [key, new Date(value.toString())]),
      ),
      sort: (sortOptions || []).length
        ? sortOptions
        : [{ key: 'scheduled', value: 'DESC' }],
    },
  });
  const workQueue = data?.workQueue || [];
  const activeWorkTypes = data?.activeWorkTypes || [];

  const loadMore = () => {
    fetchMore({
      variables: { offset: workQueue.length },
    });
  };
  return {
    workQueue,
    activeWorkTypes,
    loading,
    error,
    loadMore,
  };
};

export default useWorkQueue;
