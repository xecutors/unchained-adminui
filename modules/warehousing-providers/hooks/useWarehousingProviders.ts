import { useQuery, gql } from '@apollo/client';
import {
  IWarehousingProvidersQuery,
  IWarehousingProvidersQueryVariables,
} from '../../../gql/types';
import WarehousingProviderFragment from '../fragments/WarehousingProviderFragment';

export const WarehousingProvidersQuery = gql`
  query WarehousingProviders($type: WarehousingProviderType) {
    warehousingProviders(type: $type) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragment}
`;

const useWarehousingProviders = ({
  type = null,
}: IWarehousingProvidersQueryVariables) => {
  const { data, loading, error }: any = useQuery<
    IWarehousingProvidersQuery,
    IWarehousingProvidersQueryVariables
  >(WarehousingProvidersQuery, {
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
