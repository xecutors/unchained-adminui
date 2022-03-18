import { useQuery, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

export const ProductReviewQuery = gql`
  query ProductReview($productReviewId: ID!) {
    productReview(productReviewId: $productReviewId) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragment}
`;

const useProductReview = ({ productReviewId = null } = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    skip: !productReviewId,
    variables: { productReviewId },
  });

  return {
    review: data?.productReview,
    loading,
    error,
  };
};

export default useProductReview;
