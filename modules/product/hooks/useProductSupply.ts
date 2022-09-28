import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';

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

const useProductSupply = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);

  const { data, loading, error } = useQuery(ProductSupplyQuery, {
    skip: !id && !slug,
    variables: {
      productId: id || parsedId,
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
