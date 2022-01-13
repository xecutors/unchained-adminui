import { useMutation, gql } from '@apollo/client';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

const UpdatePaymentProviderMutation = gql`
  mutation UpdatePaymentProvider(
    $paymentProvider: UpdateProviderInput!
    $paymentProviderId: ID!
  ) {
    updatePaymentProvider(
      paymentProvider: $paymentProvider
      paymentProviderId: $paymentProviderId
    ) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragment}
`;

const useUpdatePaymentProvider = () => {
  const [updatePaymentProviderMutation] = useMutation(
    UpdatePaymentProviderMutation,
  );

  const updatePaymentProvider = async ({
    paymentProvider,
    paymentProviderId,
  }) => {
    return updatePaymentProviderMutation({
      variables: {
        paymentProvider,
        paymentProviderId,
      },
      refetchQueries: ['PaymentProvider', 'PaymentProviders'],
    });
  };

  return {
    updatePaymentProvider,
  };
};

export default useUpdatePaymentProvider;
