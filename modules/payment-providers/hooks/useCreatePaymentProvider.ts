import { useMutation, gql } from '@apollo/client';

const CreatePaymentProviderMutation = gql`
  mutation CreatePaymentProvider(
    $paymentProvider: CreatePaymentProviderInput!
  ) {
    createPaymentProvider(paymentProvider: $paymentProvider) {
      _id
    }
  }
`;

const useCreatePaymentProvider = () => {
  const [createPaymentProviderMutation, { data, loading, error }] = useMutation(
    CreatePaymentProviderMutation,
  );

  const createPaymentProvider = async ({ adapterKey, type }) => {
    return createPaymentProviderMutation({
      variables: { paymentProvider: { adapterKey, type } },
      refetchQueries: ['PaymentProviders', 'PaymentProvider'],
    });
  };
  const newPaymentProvider = data?.createPaymentProvider;
  return {
    createPaymentProvider,
    newPaymentProvider,
    loading,
    error,
  };
};

export default useCreatePaymentProvider;
