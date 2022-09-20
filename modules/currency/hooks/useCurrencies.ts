import { useQuery, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

export const CurrenciesQuery = gql`
  query Currencies(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    currencies(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...CurrencyFragment
    }
    currenciesCount(
      includeInactive: $includeInactive
      queryString: $queryString
    )
  }
  ${CurrencyFragment}
`;

const useCurrencies = ({
  queryString = '',
  limit = 20,
  offset = 0,
  includeInactive = true,
  sort = [],
} = {}) => {
  const { data, loading, error } = useQuery(CurrenciesQuery, {
    variables: { queryString, limit, offset, includeInactive, sort },
  });

  const currencies = data?.currencies || [];
  const currenciesCount = data?.currenciesCount;
  const hasMore = currencies?.length < currenciesCount;

  return {
    currencies,
    currenciesCount,
    hasMore,
    loading,
    error,
  };
};

export default useCurrencies;
