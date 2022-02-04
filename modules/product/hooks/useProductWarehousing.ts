import { useQuery, gql } from '@apollo/client';

export const ProductWarehousingQuery = gql`
  query ProductWarehousing($productId: ID, $slug: String) {
    deliveryProviderType: __type(name: "DeliveryProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const useProductWarehousing = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductWarehousingQuery, {
    variables: {
      productId,
      slug,
    },
  });

  const product = data?.product || {};

  return {
    product,
    loading,
    error,
  };
};

export default useProductWarehousing;
