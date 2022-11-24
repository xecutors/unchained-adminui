import { useQuery, gql } from '@apollo/client';
import { DefaultLimit } from '../../common/data/miscellaneous';

export const SyncReportQuery = gql`
  query SyncReports(
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
      _id
      type
      scheduled
      status
      started
      success
      finished
      created
      deleted
      priority
      worker
      retries
      original {
        _id
      }
      timeout
      input
      result
      error
    }
  }
`;

const useDailySyncs = ({
  start = null,
  end = null,
  limit = DefaultLimit,
} = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(SyncReportQuery, {
    variables: {
      created: { start, end },
      status: ['SUCCESS', 'FAILED'],
      types: ['PUBLICARE_DAILY_ANALYTICS'],
      limit,
      sort: [{ key: 'created', value: 'DESC' }],
    },
  });

  const dailySync = (data?.workQueue || [])?.filter(
    (queue) => !!queue?.result?.sync,
  );
  const loadMore = () =>
    fetchMore({
      variables: { offset: dailySync.length },
    });

  return {
    dailySync,
    loading,
    error,
    loadMore,
  };
};

export default useDailySyncs;
