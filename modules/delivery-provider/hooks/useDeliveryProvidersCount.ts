import { useQuery, gql } from '@apollo/client';

export const DeliveryProvidersCountQuery = gql`
  query DeliveryProvidersCount($type: DeliveryProviderType) {
    deliveryProvidersCount(type: $type)
  }
`;

const useDeliveryProvidersCount = ({ type = '' } = {}) => {
  const { data, loading, error }: any = useQuery(DeliveryProvidersCountQuery, {
    variables: { type },
  });

  return {
    deliveryProvidersCount: data?.deliveryProvidersCount,
    loading,
    error,
  };
};

export default useDeliveryProvidersCount;
