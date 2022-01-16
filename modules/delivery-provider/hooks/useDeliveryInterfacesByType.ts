import { useQuery, gql } from '@apollo/client';

export const DeliveryInterfacesQuery = gql`
  query DeliveryInterfaces($providerType: DeliveryProviderType!) {
    deliveryInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

const useDeliveryInterfacesByType = ({ type = null } = {}) => {
  const { data, loading, error } = useQuery(DeliveryInterfacesQuery, {
    variables: { providerType: type },
  });

  const deliveryInterfaces = data?.deliveryInterfaces || [];

  return {
    deliveryInterfaces,
    loading,
    error,
  };
};

export default useDeliveryInterfacesByType;
