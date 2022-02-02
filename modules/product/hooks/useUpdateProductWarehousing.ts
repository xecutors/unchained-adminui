import { useMutation, gql } from '@apollo/client';

const UpdateProductWarehousingMutation = gql`
  mutation UpdateProductWarehousing(
    $productId: ID!
    $warehousing: UpdateProductWarehousingInput!
  ) {
    updateProductWarehousing(productId: $productId, warehousing: $warehousing) {
      _id
    }
  }
`;

const useUpdateProductWarehousing = () => {
  const [updateProductWarehousingMutation] = useMutation(
    UpdateProductWarehousingMutation,
  );

  const updateProductWarehousing = async ({
    productId,
    sku = null,
    baseUnit = null,
  }) => {
    return updateProductWarehousingMutation({
      variables: {
        productId,
        warehousing: {
          sku,
          baseUnit,
        },
      },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductWarehousing,
  };
};

export default useUpdateProductWarehousing;
