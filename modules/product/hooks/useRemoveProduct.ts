import { useMutation, gql } from '@apollo/client';

const RemoveProductMutation = gql`
  mutation RemoveProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
    }
  }
`;

const useRemoveProduct = () => {
  const [removeProductMutation] = useMutation(RemoveProductMutation);

  const removeProduct = async ({ productId }) => {
    return removeProductMutation({
      variables: { productId },
      refetchQueries: ['Product', 'Products'],
    });
  };

  return {
    removeProduct,
  };
};

export default useRemoveProduct;
