import { useQuery, gql } from '@apollo/client';
// import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';
import productReview from '../fragments/ProductReviewFragment';
// export const ProductReviewQuery = gql`
//   query ProductReview($productReviewId: ID!) {
//     productReview(productReviewId: $productReviewId) {
//       ...ProductReviewDetailFragment
//     }
//   }
//   ${productReview}
// `;

const useProductReview = ({ productReviewId = null } = {}) => {
  const { data, loading, error } = useQuery(ProductReviewQuery, {
    variables: { productReviewId },
  });

  return {
    review: data?.productReview,
    loading,
    error,
  };
};

export default useProductReview;
