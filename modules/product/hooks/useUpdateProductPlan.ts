import { useMutation, gql } from '@apollo/client';

const UpdateProductPlanMutation = gql`
  mutation UpdateProductPlan($productId: ID!, $plan: UpdateProductPlanInput!) {
    updateProductPlan(productId: $productId, plan: $plan) {
      _id
    }
  }
`;

const useUpdateProductPlan = () => {
  const [updateProductPlanMutation] = useMutation(UpdateProductPlanMutation);

  const updateProductPlan = async ({
    productId,
    usageCalculationType,
    billingInterval,
    billingIntervalCount = null,
    trialInterval = null,
    trialIntervalCount = null,
  }) => {
    return updateProductPlanMutation({
      variables: {
        productId,
        plan: {
          usageCalculationType,
          billingInterval,
          billingIntervalCount,
          trialInterval,
          trialIntervalCount,
        },
      },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductPlan,
  };
};

export default useUpdateProductPlan;
