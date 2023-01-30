import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

export const GetWarehousingProviderQuery = (inlineFragment = '') => gql`
  query WarehousingProvider($warehousingProviderId: ID!) {
    warehousingProvider(warehousingProviderId: $warehousingProviderId) {
      ...WarehousingProviderFragment
      ${inlineFragment}
    }
  }
  ${WarehousingProviderFragment}
`;

const useWarehousingProvider = ({ warehousingProviderId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetWarehousingProviderQuery(customProperties?.WarehousingProvider),
    {
      skip: !warehousingProviderId,
      variables: { warehousingProviderId },
    },
  );

  return {
    warehousingProvider: data?.warehousingProvider,
    loading,
    error,
  };
};

export default useWarehousingProvider;
