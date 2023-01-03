import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import DeliveryProviderFragment from '../fragments/DeliveryProviderFragment';

export const GetDeliveryProviderQuery = (inlineFragment = '') => gql`
  query DeliveryProvider($deliveryProviderId: ID!) {
    deliveryProvider(deliveryProviderId: $deliveryProviderId) {
      ...DeliveryProviderFragment
      ${inlineFragment}
    }
  }
  ${DeliveryProviderFragment}
`;

const useDeliveryProvider = ({ deliveryProviderId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetDeliveryProviderQuery(customProperties?.DeliveryProvider),
    {
      skip: !deliveryProviderId,
      variables: { deliveryProviderId },
    },
  );

  return {
    deliveryProvider: data?.deliveryProvider,
    loading,
    error,
  };
};

export default useDeliveryProvider;
