import { useQuery, gql } from '@apollo/client';

const ORDER_STATISTICS_QUERY = gql`
  query OrderStatistics {
    orderStatistics {
      checkoutRecords {
        date
        total {
          currency
          amount
        }
      }
    }
  }
`;

const useOrderStatistics = () => {
  const { data, loading, error } = useQuery(ORDER_STATISTICS_QUERY);

  return {
    data,
    loading,
    error,
  };
};

export default useOrderStatistics;
