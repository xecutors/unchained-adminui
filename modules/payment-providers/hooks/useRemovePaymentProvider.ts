import { useMutation, gql } from '@apollo/client';

const RemovePaymentProviderMutation = gql`
  mutation RemovePaymentProvider($paymentProviderId: ID!) {
    removePaymentProvider(paymentProviderId: $paymentProviderId) {
      _id
    }
  }
`;

const useRemovePaymentProvider = () => {
  const [removePaymentProviderMutation] = useMutation(
    RemovePaymentProviderMutation,
  );

  const removePaymentProvider = async ({ paymentProviderId }) => {
    return removePaymentProviderMutation({
      variables: {
        paymentProviderId,
      },
      refetchQueries: ['PaymentProviders'],
    });
  };

  return {
    removePaymentProvider,
  };
};

export default useRemovePaymentProvider;
