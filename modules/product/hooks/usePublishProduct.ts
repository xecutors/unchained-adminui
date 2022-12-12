import { useMutation, gql } from '@apollo/client';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

const PublishProductMutation = gql`
  mutation PublishProduct($productId: ID!) {
    publishProduct(productId: $productId) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const usePublishProduct = () => {
  const [publishProductMutation] = useMutation(PublishProductMutation);

  const publishProduct = async ({ productId }) => {
    return publishProductMutation({
      variables: { productId },
    });
  };

  return {
    publishProduct,
  };
};

export default usePublishProduct;
