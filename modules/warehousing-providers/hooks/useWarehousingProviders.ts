import { useQuery, gql } from '@apollo/client';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

export const WarehousingProvidersQuery = gql`
  query WarehousingProviders($type: WarehousingProviderType) {
    warehousingProviders(type: $type) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragment}
`;

const useWarehousingProviders = ({ type = null } = {}) => {
  const { data, loading, error }: any = useQuery(WarehousingProvidersQuery, {
    variables: { type },
  });

  const warehousingProviders = data?.warehousingProviders || [];

  return {
    warehousingProviders,
    loading,
    error,
  };
};

export default useWarehousingProviders;
