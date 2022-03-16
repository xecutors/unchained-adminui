import { useMutation, gql } from '@apollo/client';

const AddProductReviewVoteMutation = gql`
  mutation AddProductReviewVote(
    $productReviewId: ID!
    $type: ProductReviewVoteType!
    $meta: JSON
  ) {
    addProductReviewVote(
      productReviewId: $productReviewId
      type: $type
      meta: $meta
    ) {
      _id
    }
  }
`;

const useAddProductReviewVote = () => {
  const [addProductReviewVoteMutation] = useMutation(
    AddProductReviewVoteMutation,
  );

  const addProductReviewVote = async ({ productReviewId, type, meta }) => {
    return addProductReviewVoteMutation({
      variables: {
        productReviewId,
        type,
        meta,
      },
      refetchQueries: ['ProductReviews', 'ProductReview'],
    });
  };

  return {
    addProductReviewVote,
  };
};

export default useAddProductReviewVote;
