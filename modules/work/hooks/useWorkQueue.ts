import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQueueQuery = gql`
  query WorkQueue(
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]
    $types: [WorkType!]
    $created: DateFilterInput
  ) {
    workQueue(
      offset: $offset
      limit: $limit
      status: $status
      types: $types
      created: $created
    ) {
      ...WorkFragment
    }
    activeWorkTypes
  }
  ${WorkFragment}
`;

const useWorkQueue = ({
  offset = 0,
  limit = 50,
  status = undefined,
  types = undefined,
  created = null,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(WorkQueueQuery, {
    variables: { offset, limit, status, types, created },
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
