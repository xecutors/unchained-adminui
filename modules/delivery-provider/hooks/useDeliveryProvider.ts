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
    skip: !deliveryProviderId,
    variables: { deliveryProviderId },
  });

  return {
    deliveryProvider: data?.deliveryProvider,
    loading,
    error,
  };
};

export const preFetchDeliveryProvider = async (
  apolloClient,
  { deliveryProviderId = null },
) => {
  const { data } = await apolloClient.query({
    query: DeliveryProviderQuery,
    skip: !deliveryProviderId,
    variables: { deliveryProviderId },
  });
  return data?.deliveryProvider;
};

export default useDeliveryProvider;
