import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../fragments/ProductBriefFragment';

export const ProductBundleItemQuery = gql`
  query ProductBundleItems($productId: ID, $slug: String) {
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
  const { data, loading, error } = useQuery(ProductBundleItemQuery, {
    skip: !productId && !slug,
    variables: { productId, slug },
  });

  const bundleItems = data?.product?.bundleItems || [];

  return {
    bundleItems,
    loading,
    error,
  };
};

export default useProductBundleItems;
