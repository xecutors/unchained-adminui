import { useMutation, gql } from '@apollo/client';
import {
  IUpdateCurrencyMutation,
  IUpdateCurrencyMutationVariables,
} from '../../../gql/types';
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
  const [updateCurrencyMutation] = useMutation<
    IUpdateCurrencyMutation,
    IUpdateCurrencyMutationVariables
  >(UpdateCurrencyMutation);

  const updateCurrency = async ({
    currency: { isoCode, isActive, decimals, contractAddress },
    currencyId,
  }: IUpdateCurrencyMutationVariables) => {
    return updateCurrencyMutation({
      variables: {
        currency: {
          isoCode,
          isActive,
          contractAddress,
          decimals: parseInt((decimals || '2') as string, 10),
        },
        currencyId,
      },
    });
  };

  return {
    updateCurrency,
  };
};

export default useUpdateCurrency;
