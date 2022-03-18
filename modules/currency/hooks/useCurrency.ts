import { useQuery, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

export const CurrencyQuery = gql`
  query Currency($currencyId: ID!) {
    currency(currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragment}
`;

const useCurrency = ({ currencyId }) => {
  const { data, loading, error } = useQuery(CurrencyQuery, {
    skip: !currencyId,
    variables: { currencyId },
  });

  return {
    currency: data?.currency,
    loading,
    error,
  };
};

export default useCurrency;
