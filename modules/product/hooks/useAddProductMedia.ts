import { useMutation, gql } from '@apollo/client';
import {
  IAddProductMediaMutation,
  IAddProductMediaMutationVariables,
} from '../../../gql/types';

const AddProductMediaMutation = gql`
  mutation AddProductMedia($productId: ID!, $media: Upload!) {
    addProductMedia(productId: $productId, media: $media) {
      _id
    }
  }
`;

const useAddProductMedia = () => {
  const [addProductMediaMutation] = useMutation<
    IAddProductMediaMutation,
    IAddProductMediaMutationVariables
  >(AddProductMediaMutation);

  const addProductMedia = async ({
    productId,
    media,
  }: IAddProductMediaMutationVariables) => {
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
