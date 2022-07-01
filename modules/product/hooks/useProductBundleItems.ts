import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
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

const useProductBundleItems = ({ productId = null, slug = null } = {}) => {
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(ProductBundleItemQuery, {
    skip: !productId && !slug,
    variables: { productId, slug, forceLocale: locale },
  });

  const bundleItems = data?.product?.bundleItems || [];

  return {
    bundleItems,
    loading,
    error,
  };
};

export default useProductBundleItems;
