import { gql } from '@apollo/client';

const ProductDimensionFragment = gql`
  fragment ProductDimensionFragment on Dimensions {
    weight
    length
    width
    height
  }
`;

export default ProductDimensionFragment;
