import { useQuery, gql } from '@apollo/client';

export const DeliveryWrappingTypesQuery = gql`
  query WrappingOptions {
    deliveryWrappingType: __type(name: "WrappingOptions") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useDeliveryWrappingTypes = () => {
  const { data, loading, error } = useQuery(DeliveryWrappingTypesQuery);

  const deliveryWrappingType = data?.deliveryWrappingType?.options || [];

  return {
    deliveryWrappingType,
    loading,
    error,
  };
};

export default useDeliveryWrappingTypes;
