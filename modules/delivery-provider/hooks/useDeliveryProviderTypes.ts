import { useQuery, gql } from '@apollo/client';
import {
  IDeliveryProvidersTypeQuery,
  IDeliveryProvidersTypeQueryVariables,
} from '../../../gql/types';

export const DeliveryProvidersTypeQuery = gql`
  query DeliveryProvidersType {
    deliveryProviderType: __type(name: "DeliveryProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useDeliveryProviderTypes = () => {
  const { data, loading, error } = useQuery<
    IDeliveryProvidersTypeQuery,
    IDeliveryProvidersTypeQueryVariables
  >(DeliveryProvidersTypeQuery);

  const deliveryProviderType = data?.deliveryProviderType?.options || [];

  return {
    deliveryProviderType,
    loading,
    error,
  };
};

export default useDeliveryProviderTypes;
