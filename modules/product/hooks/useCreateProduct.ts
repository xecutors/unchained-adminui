import { useMutation, gql } from '@apollo/client';

const CreateProductMutation = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      _id
      texts {
        _id
        slug
      }
    }
  }
`;

const useCreateProduct = () => {
  const [createProductMutation, { data, error, loading }] = useMutation(
    CreateProductMutation,
  );

  const createProduct = async ({ type, title, tags }) => {
    return createProductMutation({
      variables: { product: { title, type, tags } },
      refetchQueries: ['Products', 'Product'],
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
