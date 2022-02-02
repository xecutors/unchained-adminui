import { gql } from '@apollo/client';

const ProductVariationFragment = gql`
  fragment ProductVariationFragment on ProductVariation {
    _id
    texts {
      _id
      locale
      title
      subtitle
    }
    type
    key
    options {
      _id
      texts {
        _id
        locale
        title
        subtitle
      }
      value
    }
  }
`;

export default ProductVariationFragment;
