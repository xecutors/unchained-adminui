import { useMutation, gql } from '@apollo/client';

const UpdateProductSupplyMutation = gql`
  mutation UpdateProductSupply(
    $productId: ID!
    $supply: UpdateProductSupplyInput!
  ) {
    updateProductSupply(productId: $productId, supply: $supply) {
      _id
    }
  }
`;

const useUpdateProductSupply = () => {
  const [updateProductSupplyMutation] = useMutation(
    UpdateProductSupplyMutation,
  );

  const updateProductSupply = async ({
    productId,
    weightInGram = null,
    heightInMillimeters = null,
    lengthInMillimeters = null,
    widthInMillimeters = null,
  }) => {
    return updateProductSupplyMutation({
      variables: {
        productId,
        supply: {
          weightInGram,
          heightInMillimeters,
          lengthInMillimeters,
          widthInMillimeters,
        },
      },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductSupply,
  };
};

export default useUpdateProductSupply;
