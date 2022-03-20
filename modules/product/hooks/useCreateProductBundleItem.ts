import { useMutation, gql } from '@apollo/client';

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
  const [createProductBundleItemMutation] = useMutation(
    CreateProductBundleItemMutation,
  );

  const createProductBundleItem = async ({ productId, item }) => {
    return createProductBundleItemMutation({
      variables: { productId, item },
      refetchQueries: ['ProductBundleItems', 'Product'],
    });
  };

  return {
    createProductBundleItem,
  };
};

export default useCreateProductBundleItem;
