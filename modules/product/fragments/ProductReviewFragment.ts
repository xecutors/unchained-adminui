import { gql } from '@apollo/client';

const ProductReviewFragment = gql`
  fragment ProductReviewFragment on ProductReview {
    _id
    created
    updated
    deleted
    rating
    title
    review
    voteCount
    ownVotes {
      _id
      timestamp
      type
    }
  }
`;

export default ProductReviewFragment;
