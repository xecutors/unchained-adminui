import { useQuery, gql } from '@apollo/client';

export const CurrenciesCountQuery = gql`
  query CurrenciesCount($includeInactive: Boolean) {
    currenciesCount(includeInactive: $includeInactive)
  }
`;

const useCurrenciesCount = ({ includeInactive = false } = {}) => {
  const { data, loading, error } = useQuery(CurrenciesCountQuery, {
    variables: { includeInactive },
  });

  return {
    currenciesCount: data?.currenciesCount,
    loading,
    error,
  };
};

export default useCurrenciesCount;
