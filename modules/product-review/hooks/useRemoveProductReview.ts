import { useMutation, gql } from '@apollo/client';

const RemoveProductReviewMutation = gql`
  mutation RemoveProductReview($productReviewId: ID!) {
    removeProductReview(productReviewId: $productReviewId) {
      _id
    }
  }
`;

const useRemoveProductReview = () => {
  const [removeProductReviewMutation] = useMutation(
    RemoveProductReviewMutation,
  );

  const removeProductReview = async ({ productReviewId }) => {
    return removeProductReviewMutation({
      variables: {
        productReviewId,
      },
      refetchQueries: ['ProductReviewByProduct', 'ProductReviewByUser'],
    });
  };

  return {
    removeProductReview,
  };
};

export default useRemoveProductReview;
