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
  const { data, loading, error }: any = useQuery(GetWorkMetricQuery, {
    variables: { range: { start, end } },
  });

  const dailySync = data?.getWorkMetrics || [];

  return {
    dailySync,
    loading,
    error,
  };
};

export default useDailySyncs;
