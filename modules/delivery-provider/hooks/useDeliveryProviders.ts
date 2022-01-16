import { useQuery, gql } from '@apollo/client';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

export const DeliveryProvidersQuery = gql`
  query DeliveryProviders($type: DeliveryProviderType) {
    deliveryProviders(type: $type) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragment}
`;

const useDeliveryProviders = ({ type = '' } = {}) => {
  const { data, loading, error } = useQuery(DeliveryProvidersQuery, {
    variables: { type },
  });

  const deliveryProviders = data?.deliveryProviders || [];

  return {
    deliveryProviders,
    loading,
    error,
  };
};

export default useDeliveryProviders;
