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
  const [createDeliveryProviderMutation, { data, error, loading }] =
    useMutation(CreateDeliveryProviderMutation);

  const createDeliveryProvider = async ({ adapterKey, type }) => {
    return createDeliveryProviderMutation({
      variables: { deliveryProvider: { adapterKey, type } },
      refetchQueries: ['DeliveryProviders', 'DeliveryProvider'],
    });
  };

  const newDeliveryProvider = data?.createDeliveryProvider;

  return {
    createDeliveryProvider,
    newDeliveryProvider,
    loading,
    error,
  };
};

export default useCreateDeliveryProvider;
