import { useMutation, gql } from '@apollo/client';
import {
  ICreateProductMutation,
  ICreateProductMutationVariables,
} from '../../../gql/types';
import ProductDetailFragment from '../fragments/ProductDetailFragment';
import ProductTextsFragment from '../fragments/ProductTextsFragment';

const CreateProductMutation = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      ...ProductDetailFragment
      ... on SimpleProduct {
        texts {
          ...ProductTextsFragment
        }
      }
      ... on ConfigurableProduct {
        texts {
          ...ProductTextsFragment
        }
      }
      ... on BundleProduct {
        texts {
          ...ProductTextsFragment
        }
      }
      ... on TokenizedProduct {
        texts {
          ...ProductTextsFragment
        }
      }
      ... on PlanProduct {
        texts {
          ...ProductTextsFragment
        }
      }
    }
  }
  ${ProductDetailFragment}
  ${ProductTextsFragment}
`;

const useCreateProduct = () => {
  const [createProductMutation, { data, error, loading }] = useMutation<
    ICreateProductMutation,
    ICreateProductMutationVariables
  >(CreateProductMutation);

  const createProduct = async ({
    product: { type, texts, tags },
  }: ICreateProductMutationVariables) => {
    return createProductMutation({
      variables: { product: { texts, type, tags } },
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
