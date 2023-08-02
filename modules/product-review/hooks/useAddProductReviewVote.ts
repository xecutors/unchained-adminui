import { useMutation, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';
enum ProductReviewVoteType {
  UPVOTE,
  DOWNVOTE,
  REPORT,
}
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
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragment}
`;

const useAddProductReviewVote = () => {
  const [addProductReviewVoteMutation] = useMutation(
    AddProductReviewVoteMutation,
  );

  const addProductReviewVote = async ({
    productReviewId,
    type,
    meta,
  }: {
    productReviewId: string;
    type: ProductReviewVoteType;
    meta?: any;
  }) => {
    return addProductReviewVoteMutation({
      variables: {
        productReviewId,
        type,
        meta,
      },
      refetchQueries: ['ProductReviewByProduct', 'ProductReviewByUser'],
    });
  };

  return {
    addProductReviewVote,
  };
};

export default useAddProductReviewVote;
