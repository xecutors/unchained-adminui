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
    configuration,
    paymentProviderId,
  }) => {
    return updatePaymentProviderMutation({
      variables: {
        paymentProvider: { configuration },
        paymentProviderId,
      },
    });
  };

  return {
    updatePaymentProvider,
  };
};

export default useUpdatePaymentProvider;
