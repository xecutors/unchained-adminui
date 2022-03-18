import { useQuery, gql } from '@apollo/client';

import ProductPlanConfigurationFragment from '../fragments/ProductPlanConfigurationFragment';

export const ProductPlanQuery = gql`
  query ProductPlan($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on PlanProduct {
        plan {
          ...ProductPlanConfigurationFragment
        }
      }
    }
  }
  ${ProductPlanConfigurationFragment}
`;

const useProductPlan = ({ productId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(ProductPlanQuery, {
    skip: !productId && !slug,
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
