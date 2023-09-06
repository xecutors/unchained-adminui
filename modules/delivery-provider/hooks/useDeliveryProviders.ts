import { useQuery, gql } from '@apollo/client';
import {
  IDeliveryProvidersQuery,
  IDeliveryProvidersQueryVariables,
} from '../../../gql/types';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

const DeliveryProvidersQuery = gql`
  query DeliveryProviders($type: DeliveryProviderType) {
    deliveryProviders(type: $type) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragment}
`;

const useDeliveryProviders = ({
  type = null,
}: IDeliveryProvidersQueryVariables) => {
  const { data, loading, error } = useQuery<
    IDeliveryProvidersQuery,
    IDeliveryProvidersQueryVariables
  >(DeliveryProvidersQuery, {
    variables: { type },
  });

  const deliveryProviders = data?.deliveryProviders || [];

  return {
    deliveryProviders,
    loading,
    error,
  };
};

export default useDeliveryProviders;
