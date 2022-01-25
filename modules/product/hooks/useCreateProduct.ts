import { useMutation, gql } from '@apollo/client';

const CreateProductMutation = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      _id
    }
  }
`;

const useCreateProduct = () => {
  const [createProductMutation] = useMutation(CreateProductMutation);

  const createProduct = async ({ type, title, tags }) => {
    return createProductMutation({
      variables: { product: { title, type, tags } },
      refetchQueries: ['Products'],
    });
  };

  return {
    createProduct,
  };
};

export default useCreateProduct;
