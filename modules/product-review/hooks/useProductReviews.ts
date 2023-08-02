import { useQuery, gql } from '@apollo/client';
import ProductReviewFragment from '../fragments/ProductReviewFragment';

export const ProductReviewsQuery = gql`
  query ProductReviews(
    $limit: Int
    $offset: Int
    $sort: [ProductReviewSortOptionInput!]
    $queryString: String
  ) {
    productReviews(
      limit: $limit
      offset: $offset
      sort: $sort
      queryString: $queryString
    ) {
      ...ProductReviewFragment
    }
  }
  ${ProductReviewFragment}
`;

const useProductReviews = ({
  limit = 20,
  offset = 0,
  sort = null,
  queryString = '',
} = {}) => {
  const { data, loading, error }: any = useQuery(ProductReviewsQuery, {
    variables: { limit, offset, sort, queryString },
  });

  return {
    reviews: data?.productReviews || [],
    loading,
    error,
  };
};

export default useProductReviews;
