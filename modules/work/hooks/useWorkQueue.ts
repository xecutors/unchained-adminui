import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQueueQuery = gql`
  query WorkQueue(
    $queryString: String
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]
    $selectTypes: [WorkType!]
    $created: DateFilterInput
  ) {
    workQueue(
      queryString: $queryString
      offset: $offset
      limit: $limit
      status: $status
      selectTypes: $selectTypes
      created: $created
    ) {
      ...WorkFragment
    }
    activeWorkTypes
  }
  ${WorkFragment}
`;

const useWorkQueue = ({
  queryString = '',
  offset = 0,
  limit = 50,
  status = undefined,
  selectTypes = undefined,
  created = null,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(WorkQueueQuery, {
    variables: {
      queryString,
      offset,
      limit,
      status,
      selectTypes,
      created: Object.fromEntries(
        Object.entries(created || {})
          .filter(([, value]) => value)
          .map(([key, value]) => [key, new Date(value.toString())]),
      ),
    },
  });
  const workQueue = data?.workQueue || [];
  const activeWorkTypes = data?.activeWorkTypes || [];
  const loadMore = () =>
    fetchMore({
      variables: { offset: workQueue.length },
    });

  return {
    workQueue,
    activeWorkTypes,
    loading,
    error,
    loadMore,
  };
};

export default useWorkQueue;
