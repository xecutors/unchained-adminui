import { useMutation, gql } from '@apollo/client';

const RemoveProductMediaMutation = gql`
  mutation RemoveProductMedia($productMediaId: ID!) {
    removeProductMedia(productMediaId: $productMediaId) {
      _id
    }
  }
`;

const useRemoveProductMedia = () => {
  const [removeProductMediaMutation] = useMutation(RemoveProductMediaMutation);

  const removeProductMedia = async ({ productMediaId }) => {
    return removeProductMediaMutation({
      variables: { productMediaId },
      refetchQueries: ['Products', 'Product'],
    });
  };

  return {
    removeProductMedia,
  };
};

export default useRemoveProductMedia;
