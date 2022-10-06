import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';

import ProductVariationFragment from '../fragments/ProductVariationFragment';

export const ProductVariationQuery = gql`
  query ProductVariations($productId: ID, $slug: String) {
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

const useProductVariations = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);

  const { data, loading, error } = useQuery(ProductVariationQuery, {
    skip: !id && !parsedId,
    variables: { productId: id || parsedId },
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
