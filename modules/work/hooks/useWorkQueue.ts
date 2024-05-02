import { useQuery, gql } from '@apollo/client';
import {
  ISortDirection,
  IWorkQueueQuery,
  IWorkQueueQueryVariables,
} from '../../../gql/types';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import WorkFragment from '../fragments/WorkFragment';

const WorkQueueQuery = gql`
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
  offset = 0,
}: IWorkQueueQueryVariables) => {
  const { parseDate } = useFormatDateTime();
  const { data, loading, error, fetchMore, previousData } = useQuery<
    IWorkQueueQuery,
    IWorkQueueQueryVariables
  >(WorkQueueQuery, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 1000,
    variables: {
      queryString,
      offset,
      limit,
      status,
      types,
      created: Object.fromEntries(
        Object.entries(created || {})
          .filter(([, value]) => value)
          .map(([key, value]) => [key, parseDate(value)]),
      ),
      sort: (sortOptions || []).length
        ? sortOptions
        : [{ key: 'scheduled', value: ISortDirection.Desc }],
    },
  });
  const workQueue = data?.workQueue || previousData?.workQueue || [];
  const activeWorkTypes = data?.activeWorkTypes || [];

  const loadMore = () => {
    fetchMore({
      variables: { offset: workQueue.length },
    });
  };
  return {
    workQueue,
    total: data?.workQueueCount || 0,
    activeWorkTypes,
    loading,
    error,
    loadMore,
  };
};

export default useWorkQueue;
