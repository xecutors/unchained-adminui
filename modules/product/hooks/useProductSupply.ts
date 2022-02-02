import { useQuery, gql } from '@apollo/client';

import ProductDimensionsFragment from '../fragments/ProductDimensionFragment';

export const ProductSupplyQuery = gql`
  query ProductSupply(
    $productId: ID
    $slug: String
    $weightUnit: MassUnit = GRAM
    $lengthUnit: LengthUnit = MILLIMETERS
    $widthUnit: LengthUnit = MILLIMETERS
    $heightUnit: LengthUnit = MILLIMETERS
  ) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on SimpleProduct {
        dimensions {
          ...ProductDimensionsFragment
        }
      }
    }
  }
  ${ProductDimensionsFragment}
`;

const useProductSupply = ({
  productId = null,
  slug = null,
  weightUnit = null,
  lengthUnit = null,
  widthUnit = null,
  heightUnit = null,
} = {}) => {
  const { data, loading, error } = useQuery(ProductSupplyQuery, {
    variables: {
      productId,
      slug,
      heightUnit,
      widthUnit,
      lengthUnit,
      weightUnit,
    },
  });

  const product = data?.product || {};
  const dimensions = product?.dimensions || {};

  return {
    dimensions,
    loading,
    error,
  };
};

export default useProductSupply;
