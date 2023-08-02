import { useMutation, gql } from '@apollo/client';
import ProductReviewDetailFragment from '../fragments/ProductReviewDetailFragment';
import { ProductReviewVoteType } from './useAddProductReviewVote';

const RemoveProductReviewVoteMutation = gql`
  mutation removeProductReviewVote(
    $productReviewId: ID!
    $type: ProductReviewVoteType!
  ) {
    removeProductReviewVote(productReviewId: $productReviewId, type: $type) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragment}
`;

const useRemoveProductReviewVote = () => {
  const [removeProductReviewVoteMutation] = useMutation(
    RemoveProductReviewVoteMutation,
  );

  const removeProductReviewVote = async ({
    productReviewId,
    type,
  }: {
    productReviewId: string;
    type: ProductReviewVoteType;
  }) => {
    return removeProductReviewVoteMutation({
      variables: {
        productReviewId,
        type,
      },
      refetchQueries: ['ProductReviewByProduct', 'ProductReviewByUser'],
    });
  };

  return {
    removeProductReviewVote,
  };
};

export default useRemoveProductReviewVote;
