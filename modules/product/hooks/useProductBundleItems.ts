import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import ProductBriefFragment from '../fragments/ProductBriefFragment';

export const ProductBundleItemQuery = gql`
  query ProductBundleItems(
    $productId: ID
    $slug: String
    $forceLocale: String
  ) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on BundleProduct {
        bundleItems {
          product {
            ...ProductBriefFragment
          }
          quantity
        }
      }
    }
  }
  ${ProductBriefFragment}
`;

const useProductBundleItems = ({ productId: id = null, slug = null } = {}) => {
  const { locale } = useIntl();
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(ProductBundleItemQuery, {
    skip: !id && !parsedId,
    variables: { productId: id || parsedId, forceLocale: locale },
  });

  const bundleItems = data?.product?.bundleItems || [];

  return {
    bundleItems,
    loading,
    error,
  };
};

export default useProductBundleItems;
