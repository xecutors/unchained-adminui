import { useQuery, gql } from '@apollo/client';

export const ProductWarehousingQuery = gql`
  query ProductWarehousing($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on SimpleProduct {
        sku
        baseUnit
      }
    }
  }
`;

const useProductWarehousing = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductWarehousingQuery, {
    skip: !productId && !slug,
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
