import { useMutation, gql } from '@apollo/client';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

const UpdateDeliveryProviderMutation = gql`
  mutation UpdateDeliveryProvider(
    $deliveryProvider: UpdateProviderInput!
    $deliveryProviderId: ID!
  ) {
    updateDeliveryProvider(
      deliveryProvider: $deliveryProvider
      deliveryProviderId: $deliveryProviderId
    ) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragment}
`;

const useUpdateDeliveryProvider = () => {
  const [updateDeliveryProviderMutation] = useMutation(
    UpdateDeliveryProviderMutation,
  );

  const updateDeliveryProvider = async ({
    deliveryProvider,
    deliveryProviderId,
  }) => {
    return updateDeliveryProviderMutation({
      variables: {
        deliveryProvider,
        deliveryProviderId,
      },
      refetchQueries: ['DeliveryProvider', 'DeliveryProviders'],
    });
  };

  return {
    updateDeliveryProvider,
  };
};

export default useUpdateDeliveryProvider;
