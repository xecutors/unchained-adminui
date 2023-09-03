import { useMutation, gql } from '@apollo/client';
import {
  IRemovePaymentProviderMutation,
  IRemovePaymentProviderMutationVariables,
} from '../../../gql/types';

const RemovePaymentProviderMutation = gql`
  mutation RemovePaymentProvider($paymentProviderId: ID!) {
    removePaymentProvider(paymentProviderId: $paymentProviderId) {
      _id
    }
  }
`;

const useRemovePaymentProvider = () => {
  const [removePaymentProviderMutation] = useMutation<
    IRemovePaymentProviderMutation,
    IRemovePaymentProviderMutationVariables
  >(RemovePaymentProviderMutation);

  const removePaymentProvider = async ({
    paymentProviderId,
  }: IRemovePaymentProviderMutationVariables) => {
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
