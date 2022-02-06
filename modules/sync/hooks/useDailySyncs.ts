import { useQuery, gql } from '@apollo/client';
import PublicareDailySyncFragment from '../fragments/PublicareDailySyncFragment';

export const GetWorkMetricQuery = gql`
  query GetWorkMetrics($range: DateFilterInput) {
    getWorkMetrics(type: PUBLICARE_DAILY_ANALYTICS, range: $range) {
      ...PublicareDailySyncFragment
    }
  }
  ${PublicareDailySyncFragment}
`;

const useDailySyncs = ({ start = null, end = null } = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(
    GetWorkMetricQuery,
    {
      variables: { range: { start, end } },
    },
  );

  const dailySync = data?.getWorkMetrics || [];
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
