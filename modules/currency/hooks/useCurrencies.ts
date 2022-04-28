import { useQuery, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

export const CurrenciesQuery = gql`
  query Currencies(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
  ) {
    currencies(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
    ) {
      ...CurrencyFragment
    }
    currenciesCount(includeInactive: $includeInactive)
  }
  ${CurrencyFragment}
`;

const useCurrencies = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = true,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(CurrenciesQuery, {
    variables: { queryString, limit, offset, includeInactive },
  });

  const currencies = data?.currencies || [];
  const currenciesCount = data?.currenciesCount;
  const hasMore = currencies?.length < currenciesCount;
  const loadMore = () =>
    fetchMore({
      variables: { offset: currencies.length },
    });

  return {
    currencies,
    currenciesCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useCurrencies;
