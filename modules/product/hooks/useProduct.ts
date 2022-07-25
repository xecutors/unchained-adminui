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
    skip: !productId && !slug,
    variables: { productId, slug },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export const preFetchProduct = async (
  apolloClient,
  { productId = null, slug = null },
) => {
  const { data } = await apolloClient.query({
    query: ProductQuery,
    skip: !productId && !slug,
    variables: { productId, slug },
  });
  return data?.product;
};

export default useProduct;
