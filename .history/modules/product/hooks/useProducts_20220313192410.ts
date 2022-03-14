import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../fragments/ProductBriefFragment';

export const ProductsQuery = gql`
  query products(
    $tags:"
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeDrafts: Boolean
  ) {
    products(
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeDrafts: $includeDrafts
    ) {
      ...ProductBriefFragment
    }
    productsCount(tags: $tags, slugs: $slugs, includeDrafts: $includeDrafts)
  }
  ${ProductBriefFragment}
`;

const useProducts = ({
  limit = 20,
  offset = 0,
  tags = null,
  includeDrafts = false,
  slugs = null,
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery(ProductsQuery, {
    variables: { limit, offset, includeDrafts, tags, slugs },
    notifyOnNetworkStatusChange: true,
  });
  const products = data?.products || [];
  const productsCount = data?.productsCount;
  const hasMore = products?.length < productsCount;
  const loadMore = () => {
    fetchMore({
      variables: { offset: products.length },
    });
  };

  return {
    products,
    productsCount,
    hasMore,
    loading,
    error,
    loadMore,
  };
};

export default useProducts;
