import { useMutation, gql } from '@apollo/client';

const RemoveDeliveryProviderMutation = gql`
  mutation RemoveDeliveryProvider($deliveryProviderId: ID!) {
    removeDeliveryProvider(deliveryProviderId: $deliveryProviderId) {
      _id
    }
  }
`;

const useRemoveDeliveryProvider = () => {
  const [removeDeliveryProviderMutation] = useMutation(
    RemoveDeliveryProviderMutation,
  );

  const removeDeliveryProvider = async ({ deliveryProviderId }) => {
    return removeDeliveryProviderMutation({
      variables: {
        deliveryProviderId,
      },
      refetchQueries: ['DeliveryProviders'],
    });
  };

  return {
    removeDeliveryProvider,
  };
};

export default useRemoveDeliveryProvider;
