import { useQuery, gql } from '@apollo/client';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

export const ProductQuery = gql`
  query Product($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const useProduct = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductQuery, {
    variables: { productId, slug },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export default useProduct;
