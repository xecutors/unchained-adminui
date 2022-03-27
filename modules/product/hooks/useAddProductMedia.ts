import { useMutation, gql } from '@apollo/client';

const AddProductMediaMutation = gql`
  mutation AddProductMedia($productId: ID!, $media: Upload!) {
    addProductMedia(productId: $productId, media: $media) {
      _id
    }
  }
`;

const useAddProductMedia = () => {
  const [addProductMediaMutation] = useMutation(AddProductMediaMutation);

  const addProductMedia = async ({ productId, media }) => {
    return addProductMediaMutation({
      variables: { productId, media },
      refetchQueries: ['ProductMedia'],
    });
  };

  return {
    addProductMedia,
  };
};

export default useAddProductMedia;
