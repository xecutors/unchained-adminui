import { useQuery, gql } from '@apollo/client';
import ProductMediaFragment from '../fragments/ProductMediaFragment';

export const ProductMediaQuery = gql`
  query ProductMedia($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      media {
        ...ProductMediaFragment
      }
    }
  }
  ${ProductMediaFragment}
`;

const useProductMedia = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductMediaQuery, {
    skip: !productId && !slug,
    variables: { productId, slug },
    fetchPolicy: 'cache-first',
  });

  const productMedia = data?.product?.media || [];

  return {
    productMedia,
    loading,
    error,
  };
};

export default useProductMedia;
