import { useQuery, gql } from '@apollo/client';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

export const WarehousingProviderQuery = gql`
  query WarehousingProvider($warehousingProviderId: ID!) {
    warehousingProvider(warehousingProviderId: $warehousingProviderId) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragment}
`;

const useWarehousingProvider = ({ warehousingProviderId = null } = {}) => {
  const { data, loading, error } = useQuery(WarehousingProviderQuery, {
    variables: { warehousingProviderId },
  });

  return {
    warehousingProvider: data?.warehousingProvider,
    loading,
    error,
  };
};

export default useWarehousingProvider;
