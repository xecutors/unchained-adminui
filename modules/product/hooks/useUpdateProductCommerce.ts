import { useMutation, gql } from '@apollo/client';

const UpdateProductCommerceMutation = gql`
  mutation UpdateProductCommerce(
    $productId: ID!
    $commerce: UpdateProductCommerceInput!
  ) {
    updateProductCommerce(productId: $productId, commerce: $commerce) {
      _id
    }
  }
`;

const useUpdateProductCommerce = () => {
  const [updateProductCommerceMutation] = useMutation(
    UpdateProductCommerceMutation,
  );

  const updateProductCommerce = async ({ productId, pricing }) => {
    return updateProductCommerceMutation({
      variables: {
        productId,
        commerce: {
          pricing,
        },
      },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductCommerce,
  };
};

export default useUpdateProductCommerce;
