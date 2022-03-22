import { useMutation, gql } from '@apollo/client';

const CreateDeliveryProviderMutation = gql`
  mutation CreateDeliveryProvider(
    $deliveryProvider: CreateDeliveryProviderInput!
  ) {
    createDeliveryProvider(deliveryProvider: $deliveryProvider) {
      _id
    }
  }
`;

const useCreateDeliveryProvider = () => {
  const [createDeliveryProviderMutation] = useMutation(
    CreateDeliveryProviderMutation,
  );

  const createDeliveryProvider = async ({ adapterKey, type }) => {
    return createDeliveryProviderMutation({
      variables: { deliveryProvider: { adapterKey, type } },
      refetchQueries: ['DeliveryProviders', 'DeliveryProvider'],
    });
  };

  return {
    createDeliveryProvider,
  };
};

export default useCreateDeliveryProvider;
