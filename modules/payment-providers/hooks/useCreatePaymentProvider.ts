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
  const [createPaymentProviderMutation] = useMutation(
    CreatePaymentProviderMutation,
  );

  const createPaymentProvider = async ({ adapterKey, type }) => {
    return createPaymentProviderMutation({
      variables: { paymentProvider: { adapterKey, type } },
      refetchQueries: ['PaymentProviders'],
    });
  };

  return {
    createPaymentProvider,
  };
};

export default useCreatePaymentProvider;
