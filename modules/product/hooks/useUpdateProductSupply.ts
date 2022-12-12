import { useMutation, gql } from '@apollo/client';
import ProductDimensionFragment from '../fragments/ProductDimensionFragment';

const UpdateProductSupplyMutation = gql`
  mutation UpdateProductSupply(
    $productId: ID!
    $supply: UpdateProductSupplyInput!
  ) {
    updateProductSupply(productId: $productId, supply: $supply) {
      _id
      ... on SimpleProduct {
        dimensions {
          ...ProductDimensionFragment
        }
      }
    }
  }
  ${ProductDimensionFragment}
`;

const useUpdateProductSupply = () => {
  const [updateProductSupplyMutation] = useMutation(
    UpdateProductSupplyMutation,
  );

  const updateProductSupply = async ({
    productId,
    weightInGram: weight = null,
    heightInMillimeters: height = null,
    lengthInMillimeters: length = null,
    widthInMillimeters: width = null,
  }) => {
    return updateProductSupplyMutation({
      variables: {
        productId,
        supply: {
          weightInGram: weight || null,
          heightInMillimeters: height || null,
          lengthInMillimeters: length || null,
          widthInMillimeters: width || null,
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
