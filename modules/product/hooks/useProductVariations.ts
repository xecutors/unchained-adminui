import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { parseUniqueId } from '../../common/utils/getUniqueId';

import ProductVariationFragment from '../fragments/ProductVariationFragment';

export const ProductVariationQuery = gql`
  query ProductVariations($productId: ID, $slug: String, $forceLocale: String) {
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

const useProductVariations = ({
  productId: id = null,
  slug = null,
  locale = null,
} = {}) => {
  const parsedId = parseUniqueId(slug);
  const { locale: defaultLocale } = useIntl();
  const forceLocale = locale || defaultLocale;
  const { data, loading, error } = useQuery(ProductVariationQuery, {
    skip: !id && !parsedId,
    variables: { productId: id || parsedId, forceLocale },
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
