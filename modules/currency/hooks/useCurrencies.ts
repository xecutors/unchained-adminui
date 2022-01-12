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
  }
  ${CurrencyFragment}
`;

const useCurrencies = ({ limit = 20, offset = 0, includeInactive = true }) => {
  const {
    data: { currencies },
    loading,
    error,
  } = useQuery(CurrenciesQuery, {
    variables: { limit, offset, includeInactive },
  });

  return {
    currencies,
    loading,
    error,
  };
};

export default useCurrencies;
