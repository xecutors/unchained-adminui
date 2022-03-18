import { useQuery, gql } from '@apollo/client';

import ProductVariationFragment from '../fragments/ProductVariationFragment';

export const ProductVariationQuery = gql`
  query ProductVariation($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on ConfigurableProduct {
        variations {
          ...ProductVariationFragment
        }
      }
    }
  }
  ${ProductVariationFragment}
`;

const useProductVariations = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductVariationQuery, {
    skip: !productId && !slug,
    variables: { productId, slug },
  });

  const product = data?.product || {};
  const variations = product?.variations || [];

  return {
    variations,
    loading,
    error,
  };
};

export default useProductVariations;
