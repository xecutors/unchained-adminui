import { useQuery, gql } from '@apollo/client';

export const WarehousingProvidersTypeQuery = gql`
  query WarehousingProvidersType {
    warehousingProviderType: __type(name: "WarehousingProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useWarehousingProviderTypes = () => {
  const { data, loading, error } = useQuery(WarehousingProvidersTypeQuery);

  const warehousingProviderType = data?.warehousingProviderType?.options || [];

  return {
    warehousingProviderType,
    loading,
    error,
  };
};

export default useWarehousingProviderTypes;
