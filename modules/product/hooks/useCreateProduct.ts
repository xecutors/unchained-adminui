import { useMutation, gql } from '@apollo/client';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

const CreateProductMutation = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const useCreateProduct = () => {
  const [createProductMutation, { data, error, loading }] = useMutation(
    CreateProductMutation,
  );

  const createProduct = async ({ type, title, tags }) => {
    return createProductMutation({
      variables: { product: { title, type, tags } },
      refetchQueries: ['Products'],
    });
  };
  const newProduct = data?.createProduct;
  return {
    createProduct,
    newProduct,
    error,
    loading,
  };
};

export default useCreateProduct;
