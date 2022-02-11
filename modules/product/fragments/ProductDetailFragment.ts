import { gql } from '@apollo/client';

const ProductDetailFragment = gql`
  fragment ProductDetailFragment on Product {
    _id
    sequence
    status
    tags
    updated
    __typename
    published
    texts {
      _id
      slug
      title
      subtitle
      description
      vendor
      brand
      labels
      categories
    }
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
    reviews {
      _id
      created
      author {
        _id
        username
        isGuest
      }
      rating
      title
      review
      voteCount
      ownVotes {
        _id
        timestamp
      }
    }
    siblings {
      _id
      media {
        _id
        file {
          _id
          url
        }
      }
      texts {
        _id
        title
        subtitle
        description
      }
    }
    meta
  }
`;

export default ProductDetailFragment;
