import { useMutation, gql } from '@apollo/client';

const RemoveBundleItemMutation = gql`
  mutation RemoveBundleItem($productId: ID!, $index: Int!) {
    removeBundleItem(productId: $productId, index: $index) {
      _id
    }
  }
`;

const useRemoveBundleItem = () => {
  const [removeBundleItemMutation] = useMutation(RemoveBundleItemMutation);

  const removeBundleItem = async ({ productId, index }) => {
    return removeBundleItemMutation({
      variables: { productId, index },
      refetchQueries: ['Products'],
    });
  };

  return {
    removeBundleItem,
  };
};

export default useRemoveBundleItem;
