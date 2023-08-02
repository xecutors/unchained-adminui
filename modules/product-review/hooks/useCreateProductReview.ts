import { useMutation, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';

const CreateProductReviewMutation = gql`
  mutation CreateProductReview(
    $productId: ID!
    $productReview: ProductReviewInput!
  ) {
    createProductReview(productId: $productId, productReview: $productReview) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragment}
`;

const useCreateProductReview = () => {
  const [createProductReviewMutation] = useMutation(
    CreateProductReviewMutation,
  );

  const createProductReview = async ({ productId, title, rating, review }) => {
    return createProductReviewMutation({
      variables: {
        productId,
        productReview: {
          title,
          rating,
          review,
        },
      },
      refetchQueries: ['ProductReviewByProduct', 'ProductReviewByUser'],
    });
  };

  return {
    createProductReview,
  };
};

export default useCreateProductReview;
