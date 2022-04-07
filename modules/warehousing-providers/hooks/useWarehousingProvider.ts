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
    skip: !warehousingProviderId,
    variables: { warehousingProviderId },
  });

  return {
    warehousingProvider: data?.warehousingProvider,
    loading,
    error,
  };
};

export const preFetchWarehousingProvider = async (
  apolloClient,
  { warehousingProviderId = null },
) => {
  const { data } = await apolloClient.query({
    query: WarehousingProviderQuery,
    skip: !warehousingProviderId,
    variables: { warehousingProviderId },
  });
  return data?.warehousingProvider;
};

export default useWarehousingProvider;
