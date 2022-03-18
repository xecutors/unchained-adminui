import { useMutation, gql } from '@apollo/client';

const RemoveCurrencyMutation = gql`
  mutation RemoveCurrency($currencyId: ID!) {
    removeCurrency(currencyId: $currencyId) {
      _id
    }
  }
`;

const useRemoveCurrency = () => {
  const [removeCurrencyMutation] = useMutation(RemoveCurrencyMutation);

  const removeCurrency = async ({ currencyId }) => {
    return removeCurrencyMutation({
      variables: { currencyId },
      refetchQueries: ['Currencies', 'CurrencyId'],
    });
  };

  return {
    removeCurrency,
  };
};

export default useRemoveCurrency;
