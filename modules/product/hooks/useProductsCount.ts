import { useQuery, gql } from '@apollo/client';

const ProductsCountQuery = gql`
  query ProductsCount(
    $queryString: String
    $tags: [LowerCaseString!]
    $slugs: [String!]
    $includeDrafts: Boolean
  ) {
    productsCount(
      tags: $tags
      slugs: $slugs
      includeDrafts: $includeDrafts
      queryString: $queryString
    )
  }
`;

const useProductsCount = ({
  queryString = '',
  tags = null,
  includeDrafts = true,
}) => {
  const { data, loading, error } = useQuery(ProductsCountQuery, {
    variables: {
      queryString,
      includeDrafts,
      tags,
    },
  });

  const productsCount = data?.productsCount;

  return {
    productsCount,
    loading,
    error,
  };
};

export default useProductsCount;
