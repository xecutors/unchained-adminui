import { gql } from '@apollo/client';

const ProductDetailFragment = gql`
  fragment ProductDetailFragment on Product {
    _id
    sequence
    status
    created
    tags
    updated
    published
    sequence
    ... on SimpleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        slug
        title
        subtitle
        description
        vendor
        brand
        labels
      }
    }
    ... on ConfigurableProduct {
      texts(forceLocale: $forceLocale) {
        _id
        slug
        title
        subtitle
        description
        vendor
        brand
        labels
      }
    }
    ... on BundleProduct {
      texts(forceLocale: $forceLocale) {
        _id
        slug
        title
        subtitle
        description
        vendor
        brand
        labels
      }
    }
    ... on PlanProduct {
      texts(forceLocale: $forceLocale) {
        _id
        slug
        title
        subtitle
        description
        vendor
        brand
        labels
      }
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
  }
`;

export default ProductDetailFragment;
