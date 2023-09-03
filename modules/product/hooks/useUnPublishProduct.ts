import { useMutation, gql } from '@apollo/client';
import {
  IUnpublishProductMutation,
  IUnpublishProductMutationVariables,
} from '../../../gql/types';
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
  const [unPublishProductMutation] = useMutation<
    IUnpublishProductMutation,
    IUnpublishProductMutationVariables
  >(UnPublishProductMutation);

  const unPublishProduct = async ({
    productId,
  }: IUnpublishProductMutationVariables) => {
    return unPublishProductMutation({
      variables: { productId },
    });
  };

  return {
    unPublishProduct,
  };
};

export default useUnPublishProduct;
