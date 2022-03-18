import { useQuery, gql } from '@apollo/client';

import ProductDimensionFragment from '../fragments/ProductDimensionFragment';

export const ProductSupplyQuery = gql`
  query ProductSupply($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on SimpleProduct {
        dimensions {
          ...ProductDimensionFragment
        }
      }
    }
  }
  ${ProductDimensionFragment}
`;

const useProductSupply = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductSupplyQuery, {
    skip: !productId && !slug,
    variables: {
      productId,
      slug,
    },
  });

  const product = data?.product || {};
  const dimensions = product?.dimensions || {};

  return {
    dimensions,
    loading,
    error,
  };
};

export default useProductSupply;
