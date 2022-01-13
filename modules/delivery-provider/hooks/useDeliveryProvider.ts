import { useQuery, gql } from '@apollo/client';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

export const DeliveryProviderQuery = gql`
  query DeliveryProvider($deliveryProviderId: ID!) {
    deliveryProvider(deliveryProviderId: $deliveryProviderId) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragment}
`;

const useDeliveryProvider = ({ deliveryProviderId = null } = {}) => {
  const { data, loading, error } = useQuery(DeliveryProviderQuery, {
    variables: { deliveryProviderId },
  });

  return {
    deliveryProvider: data?.deliveryProvider,
    loading,
    error,
  };
};

export default useDeliveryProvider;
