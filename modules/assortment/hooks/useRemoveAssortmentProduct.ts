import { useMutation, gql } from '@apollo/client';

const RemoveAssortmentProductMutation = gql`
  mutation RemoveAssortmentProduct($assortmentProductId: ID!) {
    removeAssortmentProduct(assortmentProductId: $assortmentProductId) {
      _id
    }
  }
`;

const useRemoveAssortmentProduct = () => {
  const [removeAssortmentProductMutation] = useMutation(
    RemoveAssortmentProductMutation,
  );

  const removeAssortmentProduct = async ({ assortmentProductId }) => {
    return removeAssortmentProductMutation({
      variables: { assortmentProductId },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    removeAssortmentProduct,
  };
};

export default useRemoveAssortmentProduct;
