import { gql } from '@apollo/client';

const ProductDimensionsFragment = gql`
  fragment ProductDimensionsFragment on Dimensions {
    weight(unit: $widthUnit)
    length(unit: $lengthUnit)
    width(unit: $widthUnit)
    height(unit: $heightUnit)
  }
`;

export default ProductDimensionsFragment;
