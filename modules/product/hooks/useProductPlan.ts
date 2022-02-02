import { useQuery, gql } from '@apollo/client';

import ProductPlanConfigurationFragment from '../fragments/ProductPlanConfigurationFragment';

export const ProductPlanQuery = gql`
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
      ... on PlanProduct {
        dimensions {
          ...ProductPlanConfigurationFragment
        }
      }
    }
  }
  ${ProductPlanConfigurationFragment}
`;

const useProductPlan = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductPlanQuery, {
    variables: {
      productId,
      slug,
    },
  });

  const product = data?.product || {};
  const plan = product?.plan || {};

  return {
    plan,
    loading,
    error,
  };
};

export default useProductPlan;
