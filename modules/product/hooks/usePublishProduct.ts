import { useMutation, gql } from '@apollo/client';

const PublishProductMutation = gql`
  mutation PublishProduct($productId: ID!) {
    publishProduct(productId: $productId) {
      _id
      status
    }
  }
`;

const usePublishProduct = () => {
  const [publishProductMutation] = useMutation(PublishProductMutation);

  const publishProduct = async ({ productId }) => {
    return publishProductMutation({
      variables: { productId },
      refetchQueries: ['Product'],
    });
  };

  return {
    publishProduct,
  };
};

export default usePublishProduct;
