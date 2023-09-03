import { useMutation, gql } from '@apollo/client';
import {
  ICreateProductMutation,
  ICreateProductMutationVariables,
} from '../../../gql/types';
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
  const [createProductMutation, { data, error, loading }] = useMutation<
    ICreateProductMutation,
    ICreateProductMutationVariables
  >(CreateProductMutation);

  const createProduct = async ({
    product: { type, title, tags },
  }: ICreateProductMutationVariables) => {
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
