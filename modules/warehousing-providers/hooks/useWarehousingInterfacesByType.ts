import { useQuery, gql } from '@apollo/client';

export const WarehousingInterfacesQuery = gql`
  query WarehousingInterfaces($providerType: WarehousingProviderType!) {
    warehousingInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

const useWarehousingInterfacesByType = ({ type = null } = {}) => {
  const { data, loading, error } = useQuery(WarehousingInterfacesQuery, {
    variables: { providerType: type },
  });

  const warehousingInterfaces = data?.warehousingInterfaces || [];

  return {
    warehousingInterfaces,
    loading,
    error,
  };
};

export default useWarehousingInterfacesByType;
