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
      refetchQueries: ['Products', 'Product'],
    });
  };

  return {
    addProductMedia,
  };
};

export default useAddProductMedia;
// https://engine.dev.publicare.ch/cdn/storage/media/j9PjsKRgbFWYLLAY3/original/j9PjsKRgbFWYLLAY3.jpg