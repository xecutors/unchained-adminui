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
  const { data, loading, error, fetchMore } = useQuery(DeliveryProvidersQuery, {
    variables: { type },
  });

  const deliveryProviders = data?.deliveryProviders || [];
  const loadMore = () =>
    fetchMore({
      variables: { offset: deliveryProviders?.length },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          deliveryProviders: [
            ...prev.deliveryProviders,
            ...fetchMoreResult.deliveryProviders,
          ],
        };
      },
    });
  return {
    deliveryProviders,
    loadMore,
    loading,
    error,
  };
};

export default useDeliveryProviders;
