import { useMutation, gql } from '@apollo/client';

const CreateCurrencyMutation = gql`
  mutation CreateCurrency($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      _id
    }
  }
`;

const useCreateCurrency = () => {
  const [createCurrencyMutation] = useMutation(CreateCurrencyMutation);

  const createCurrency = async ({ isoCode }) => {
    return createCurrencyMutation({
      variables: { currency: { isoCode } },
      refetchQueries: ['Currencies'],
    });
  };

  return {
    createCurrency,
  };
};

export default useCreateCurrency;
