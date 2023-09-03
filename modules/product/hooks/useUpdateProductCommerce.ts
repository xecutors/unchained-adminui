import { useMutation, gql } from '@apollo/client';
import {
  IUpdateProductCommerceMutation,
  IUpdateProductCommerceMutationVariables,
} from '../../../gql/types';
import ProductDetailFragment from '../fragments/ProductDetailFragment';

const UpdateProductCommerceMutation = gql`
  mutation UpdateProductCommerce(
    $productId: ID!
    $commerce: UpdateProductCommerceInput!
  ) {
    updateProductCommerce(productId: $productId, commerce: $commerce) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragment}
`;

const useUpdateProductCommerce = () => {
  const [updateProductCommerceMutation] = useMutation<
    IUpdateProductCommerceMutation,
    IUpdateProductCommerceMutationVariables
  >(UpdateProductCommerceMutation);

  const updateProductCommerce = async ({
    productId,
    commerce: { pricing },
  }: IUpdateProductCommerceMutationVariables) => {
    return updateProductCommerceMutation({
      variables: {
        productId,
        commerce: {
          pricing,
        },
      },
      refetchQueries: ['Products'],
    });
  };

  return {
    updateProductCommerce,
  };
};

export default useUpdateProductCommerce;
