import { useQuery, gql } from '@apollo/client';
import PublicareDailySyncFragment from '../fragments/PublicareDailySyncFragment';
import SyncReportFragment from '../fragments/SyncReportFragment';

export const GetWorkMetricQuery = gql`
  query work($range: DateFilterInput) {
    work(type: PUBLICARE_DAILY_ANALYTICS, range: $range) {
      ...PublicareDailySyncFragment
      result {
        ...SyncReportFragment
      }
    }
  }
  ${PublicareDailySyncFragment}
  ${SyncReportFragment}
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
