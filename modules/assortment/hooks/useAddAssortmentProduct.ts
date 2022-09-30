import { useMutation, gql } from '@apollo/client';

const AddAssortmentProductMutation = gql`
  mutation AddAssortmentProduct(
    $assortmentId: ID!
    $productId: ID!
    $tags: [LowerCaseString!]
  ) {
    addAssortmentProduct(
      assortmentId: $assortmentId
      productId: $productId
      tags: $tags
    ) {
      _id
    }
  }
`;

const useAddAssortmentProduct = () => {
  const [addAssortmentProductMutation] = useMutation(
    AddAssortmentProductMutation,
  );

  const addAssortmentProduct = async ({ productId, assortmentId, tags }) => {
    return addAssortmentProductMutation({
      variables: { productId, assortmentId, tags },
      refetchQueries: ['AssortmentProducts', 'Product'],
    });
  };

  return {
    addAssortmentProduct,
  };
};

export default useAddAssortmentProduct;
