import { useMutation, gql } from '@apollo/client';

const UnPublishProductMutation = gql`
  mutation UnpublishProduct($productId: ID!) {
    unpublishProduct(productId: $productId) {
      _id
      status
    }
  }
`;

const useUnPublishProduct = () => {
  const [unPublishProductMutation] = useMutation(UnPublishProductMutation);

  const unPublishProduct = async ({ productId }) => {
    return unPublishProductMutation({
      variables: { productId },
      refetchQueries: ['Product', 'Products'],
    });
  };

  return {
    unPublishProduct,
  };
};

export default useUnPublishProduct;
