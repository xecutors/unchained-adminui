import { useMutation, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

const UpdateCurrencyMutation = gql`
  mutation UpdateCurrency($currency: UpdateCurrencyInput!, $currencyId: ID!) {
    updateCurrency(currency: $currency, currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragment}
`;

const useUpdateCurrency = () => {
  const [updateCurrencyMutation] = useMutation(UpdateCurrencyMutation);

  const updateCurrency = async ({ isoCode, isActive, currencyId }) => {
    return updateCurrencyMutation({
      variables: {
        currency: { isoCode, isActive },
        currencyId,
      },
      refetchQueries: ['Currency', 'Currencies'],
    });
  };

  return {
    updateCurrency,
  };
};

export default useUpdateCurrency;
