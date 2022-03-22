import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../fragments/ProductBriefFragment';

export const SearchProductsQuery = gql`
  query SearchProducts(
    $queryString: String
    $filterQuery: [FilterQueryInput!]
    $assortmentId: ID
    $orderBy: SearchOrderBy
    $includeInactive: Boolean
    $ignoreChildAssortments: Boolean
    $limit: Int
    $offset: Int
  ) {
    searchProducts(
      queryString: $queryString
      filterQuery: $filterQuery
      assortmentId: $assortmentId
      orderBy: $orderBy
      includeInactive: $includeInactive
      ignoreChildAssortments: $ignoreChildAssortments
    ) {
      productsCount
      filteredProductsCount
      products(limit: $limit, offset: $offset) {
        ...ProductBriefFragment
      }
    }
  }
  ${ProductBriefFragment}
`;

const useSearchProducts = ({
  queryString = '',
  filterQuery = [],
  assortmentId = null,
  includeInactive = false,
  orderBy = null,
  limit = 20,
  offset = 0,
  ignoreChildAssortments = false,
} = {}) => {
  const { data, loading, error } = useQuery(SearchProductsQuery, {
    skip: !queryString && !assortmentId,
    variables: {
      limit,
      offset,
      includeInactive,
      queryString,
      filterQuery,
      assortmentId,
      orderBy,
      ignoreChildAssortments,
    },
  });
  const searchProducts = data?.searchProducts || {};
  const products = searchProducts?.products || [];
  const productsCount = searchProducts?.productsCount || 0;
  const filteredProductsCount = searchProducts?.filteredProductsCount || 0;
  const hasMore = products?.length < productsCount;

  return {
    products,
    productsCount,
    filteredProductsCount,
    hasMore,
    loading,
    error,
  };
};

export default useSearchProducts;
