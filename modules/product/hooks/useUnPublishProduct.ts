import { useMutation, gql } from '@apollo/client';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

const UnPublishProductMutation = gql`
  mutation UnpublishProduct($productId: ID!) {
    unpublishProduct(productId: $productId) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const useUnPublishProduct = () => {
  const [unPublishProductMutation] = useMutation(UnPublishProductMutation);

  const unPublishProduct = async ({ productId }) => {
    return unPublishProductMutation({
      variables: { productId },
    });
  };

  return {
    unPublishProduct,
  };
};

export default useUnPublishProduct;
