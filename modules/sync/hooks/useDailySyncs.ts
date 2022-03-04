import { useQuery } from '@apollo/client';
import { WorkQueueQuery } from '../../work/hooks/useWorkQueue';

const useDailySyncs = ({ start = null, end = null } = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(WorkQueueQuery, {
    variables: {
      range: { start, end },
      status: ['SUCCESS', 'FAILED'],
      selectTypes: ['PUBLICARE_DAILY_ANALYTICS'],
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
