import { useQuery, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

export const ProductReviewQuery = gql`
  query UserProductReviews(
    $userId: ID!
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    user(userId: $userId) {
      _id
      reviews(limit: $limit, offset: $offset, sort: $sort) {
        ...ProductReviewDetailFragment
      }
    }
  }
  ${ProductReviewDetailFragment}
`;

const useUserProductReviews = ({
  userId = null,
  limit = 10,
  offset = 0,
  sort: sortOptions = [{ key: 'created', value: 'DESC' }],
} = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    skip: !userId,
    variables: { userId, limit, offset, sortOptions },
  });
  const user = data?.user;
  const reviews = user?.reviews || [];
  return {
    reviews,
    loading,
    error,
  };
};

export default useUserProductReviews;
