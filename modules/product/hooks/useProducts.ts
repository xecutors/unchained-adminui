import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import ProductBriefFragment from '../fragments/ProductBriefFragment';

export const ProductsQuery = gql`
  query Products(
    $queryString: String
    $tags: [String!]
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeDrafts: Boolean
    $sort: [SortOptionInput!]
    $forceLocale: String
  ) {
    products(
      queryString: $queryString
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeDrafts: $includeDrafts
      sort: $sort
    ) {
      ...ProductBriefFragment
    }
    productsCount(tags: $tags, slugs: $slugs, includeDrafts: $includeDrafts)
  }
  ${ProductBriefFragment}
`;

const useProducts = ({
  queryString = '',
  limit = 20,
  offset = 0,
  tags = null,
  includeDrafts = false,
  slugs = null,
  sort = [],
} = {}) => {
  const { locale } = useIntl();
  const { data, loading, error } = useQuery(ProductsQuery, {
    variables: {
      queryString,
      limit,
      offset,
      includeDrafts,
      tags,
      slugs,
      sort,
      forceLocale: locale,
    },
  });
  const products = data?.products || [];
  const productsCount = data?.productsCount;
  const hasMore = products?.length < productsCount;

  return {
    products,
    productsCount,
    hasMore,
    loading,
    error,
  };
};

export default useProducts;
