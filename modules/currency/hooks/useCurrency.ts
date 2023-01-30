import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import CurrencyFragment from '../fragments/CurrencyFragment';

export const GetCurrencyQuery = (inlineFragment = '') => gql`
  query Currency($currencyId: ID!) {
    currency(currencyId: $currencyId) {
      ...CurrencyFragment
      ${inlineFragment}
    }
  }
  ${CurrencyFragment}
`;

const useCurrency = ({ currencyId }) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetCurrencyQuery(customProperties?.Currency),
    {
      skip: !currencyId,
      variables: { currencyId },
    },
  );

  return {
    currency: data?.currency,
    loading,
    error,
  };
};

export default useCurrency;
