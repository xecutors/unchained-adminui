import { useMutation, gql } from '@apollo/client';
import {
  ICreateProductBundleItemMutation,
  ICreateProductBundleItemMutationVariables,
} from '../../../gql/types';

const CreateProductBundleItemMutation = gql`
  mutation CreateProductBundleItem(
    $productId: ID!
    $item: CreateProductBundleItemInput!
  ) {
    createProductBundleItem(productId: $productId, item: $item) {
      _id
    }
  }
`;

const useCreateProductBundleItem = () => {
  const [createProductBundleItemMutation] = useMutation<
    ICreateProductBundleItemMutation,
    ICreateProductBundleItemMutationVariables
  >(CreateProductBundleItemMutation);

  const createProductBundleItem = async ({
    productId,
    item,
  }: ICreateProductBundleItemMutationVariables) => {
    return createProductBundleItemMutation({
      variables: { productId, item },
      refetchQueries: ['ProductBundleItems'],
    });
  };

  return {
    createProductBundleItem,
  };
};

export default useCreateProductBundleItem;
