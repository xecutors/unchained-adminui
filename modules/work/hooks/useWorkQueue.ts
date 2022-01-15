import { useQuery, gql } from '@apollo/client';
import WorkFragment from '../fragments/WorkFragment';

export const WorkQueueQuery = gql`
  query WorkQueue(
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]!
    $selectTypes: [WorkType!] = []
    $created: DateFilterInput
  ) {
    workQueue(
      offset: $offset
      limit: $limit
      status: $status
      selectTypes: $selectTypes
      created: $created
    ) {
      ...WorkFragment
    }
  }
  ${WorkFragment}
`;

const useWorkQueue = ({
  offset = 0,
  limit = 50,
  status = ['NEW'],
  selectTypes = [],
  created = null,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(WorkQueueQuery, {
    variables: { offset, limit, status, selectTypes, created },
  });
  const workQueue = data?.workQueue || [];
  const loadMore = () =>
    fetchMore({
      variables: { offset: workQueue.length },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          workQueue: [...prev.workQueue, ...fetchMoreResult.workQueue],
        };
      },
    });

  return {
    workQueue,
    loading,
    error,
    loadMore,
  };
};

export default useWorkQueue;
