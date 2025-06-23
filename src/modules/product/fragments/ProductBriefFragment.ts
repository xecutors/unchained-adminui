import { gql } from '@apollo/client';

const ProductBriefFragment = gql`
  fragment ProductBriefFragment on Product {
    texts {
      _id
      slug
      title
      subtitle
      description
      vendor
      brand
      labels
    }
    _id
    sequence
    status
    tags
    sequence
    updated
    published
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
    ... on SimpleProduct {
      catalogPrice {
        amount
        currencyCode
      }
    }
    ... on PlanProduct {
      catalogPrice {
        amount
        currencyCode
      }
    }
  }
`;

export default ProductBriefFragment;
