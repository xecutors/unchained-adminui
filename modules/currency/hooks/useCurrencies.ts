import { useQuery, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

export const CurrenciesQuery = gql`
  query Currencies($limit: Int, $offset: Int, $includeInactive: Boolean) {
    currencies(
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
  limit = 20,
  offset = 0,
  includeInactive = true,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(CurrenciesQuery, {
    variables: { limit, offset, includeInactive },
  });

  const currencies = data?.currencies || [];
  const currenciesCount = data?.currenciesCount;
  const hasMore = currencies?.length < currenciesCount;
  const loadMore = () =>
    fetchMore({
      variables: { offset: currencies.length || 0 },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          currencies: [...prev.currencies, ...fetchMoreResult.currencies],
        };
      },
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
