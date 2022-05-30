import { useMutation, gql } from '@apollo/client';

const CreateCurrencyMutation = gql`
  mutation CreateCurrency($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      _id
    }
  }
`;

const useCreateCurrency = () => {
  const [createCurrencyMutation, { data, loading, error }] = useMutation(
    CreateCurrencyMutation,
  );

  const createCurrency = async ({ isoCode }) => {
    return createCurrencyMutation({
      variables: { currency: { isoCode } },
      refetchQueries: ['Currencies', 'Currency'],
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
