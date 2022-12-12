import { useMutation, gql } from '@apollo/client';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

const CreatePaymentProviderMutation = gql`
  mutation CreatePaymentProvider(
    $paymentProvider: CreatePaymentProviderInput!
  ) {
    createPaymentProvider(paymentProvider: $paymentProvider) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragment}
`;

const useCreatePaymentProvider = () => {
  const [createPaymentProviderMutation, { data, loading, error }] = useMutation(
    CreatePaymentProviderMutation,
  );

  const createPaymentProvider = async ({ adapterKey, type }) => {
    return createPaymentProviderMutation({
      variables: { paymentProvider: { adapterKey, type } },
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
