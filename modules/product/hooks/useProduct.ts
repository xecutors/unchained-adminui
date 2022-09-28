import { useQuery, gql } from '@apollo/client';
import { parseUniqueId } from '../../common/utils/getUniqueId';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

export const ProductQuery = gql`
  query Product($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const useProduct = ({ productId: id = null, slug = null } = {}) => {
  const parsedId = parseUniqueId(slug);
  const { data, loading, error } = useQuery(ProductQuery, {
    skip: !id && !slug,
    variables: { productId: id || parsedId },
  });

  return {
    product: data?.product,
    loading,
    error,
  };
};

export const preFetchProduct = async (
  apolloClient,
  { productId: id = null, slug = null },
) => {
  const parsedId = parseUniqueId(slug);
  const { data } = await apolloClient.query({
    query: ProductQuery,
    skip: !id && !parsedId,
    variables: { productId: id || parsedId },
  });
  return data?.product;
};

export default useProduct;
