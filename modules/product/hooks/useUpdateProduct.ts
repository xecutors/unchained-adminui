import { useMutation, gql } from '@apollo/client';

const UpdateProductMutation = gql`
  mutation UpdateProduct($productId: ID!, $product: UpdateProductInput!) {
    updateProduct(productId: $productId, product: $product) {
      _id
    }
  }
`;

const useUpdateProduct = () => {
  const [updateProductMutation] = useMutation(UpdateProductMutation);

  const updateProduct = async ({ productId, tags, sequence, meta }) => {
    return updateProductMutation({
      variables: {
        productId,
        product: {
          tags,
          sequence,
          meta,
        },
      },
      refetchQueries: ['Product', 'Products'],
    });
  };

  return {
    updateProduct,
  };
};

export default useUpdateProduct;
