import { useMutation, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

const RemoveCurrencyMutation = gql`
  mutation RemoveCurrency($currencyId: ID!) {
    removeCurrency(currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragment}
`;

const useRemoveCurrency = () => {
  const [removeCurrencyMutation] = useMutation(RemoveCurrencyMutation);

  const removeCurrency = async ({ currencyId }) => {
    return removeCurrencyMutation({
      variables: { currencyId },
      refetchQueries: ['Currencies'],
    });
  };

  return {
    removeCurrency,
  };
};

export default useRemoveCurrency;
