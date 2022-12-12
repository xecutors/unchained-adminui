import { useMutation, gql } from '@apollo/client';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

const CreateDeliveryProviderMutation = gql`
  mutation CreateDeliveryProvider(
    $deliveryProvider: CreateDeliveryProviderInput!
  ) {
    createDeliveryProvider(deliveryProvider: $deliveryProvider) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragment}
`;

const useCreateDeliveryProvider = () => {
  const [createDeliveryProviderMutation, { data, error, loading }] =
    useMutation(CreateDeliveryProviderMutation);

  const createDeliveryProvider = async ({ adapterKey, type }) => {
    return createDeliveryProviderMutation({
      variables: { deliveryProvider: { adapterKey, type } },
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
