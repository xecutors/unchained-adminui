import { useMutation, gql } from '@apollo/client';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

const UpdateProductMutation = gql`
  mutation UpdateProduct($productId: ID!, $product: UpdateProductInput!) {
    updateProduct(productId: $productId, product: $product) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
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
    });
  };

  return {
    updateProduct,
  };
};

export default useUpdateProduct;
