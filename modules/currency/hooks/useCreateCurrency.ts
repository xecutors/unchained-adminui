import { useMutation, gql } from '@apollo/client';
import CurrencyFragment from '../fragments/CurrencyFragment';

const CreateCurrencyMutation = gql`
  mutation CreateCurrency($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragment}
`;

const useCreateCurrency = () => {
  const [createCurrencyMutation, { data, loading, error }] = useMutation(
    CreateCurrencyMutation,
  );

  const createCurrency = async ({ isoCode, contractAddress, decimals }) => {
    return createCurrencyMutation({
      variables: {
        currency: {
          isoCode,
          contractAddress,
          decimals: parseInt(decimals || '2', 10),
        },
      },
    });
  };
  const newCurrency = data?.createCurrency;

  return {
    createCurrency,
    newCurrency,
    error,
    loading,
  };
};

export default useCreateCurrency;
