import { useQuery } from '@apollo/client';
import { DefaultLimit } from '../../common/data/miscellaneous';
import { WorkQueueQuery } from '../../work/hooks/useWorkQueue';

const useDailySyncs = ({
  start = null,
  end = null,
  limit = DefaultLimit,
} = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(WorkQueueQuery, {
    variables: {
      range: { start, end },
      status: ['SUCCESS', 'FAILED'],
      types: ['PUBLICARE_DAILY_ANALYTICS'],
      limit,
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
