import { useQuery, gql } from '@apollo/client';
import {
  IWarehousingInterfacesQuery,
  IWarehousingInterfacesQueryVariables,
} from '../../../gql/types';

export const WarehousingInterfacesQuery = gql`
  query WarehousingInterfaces($providerType: WarehousingProviderType!) {
    warehousingInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

const useWarehousingInterfacesByType = ({
  providerType,
}: IWarehousingInterfacesQueryVariables) => {
  const { data, loading, error } = useQuery<
    IWarehousingInterfacesQuery,
    IWarehousingInterfacesQueryVariables
  >(WarehousingInterfacesQuery, {
    skip: !providerType,
    variables: { providerType },
  });

  const warehousingInterfaces = data?.warehousingInterfaces || [];

  return {
    warehousingInterfaces,
    loading,
    error,
  };
};

export default useWarehousingInterfacesByType;
