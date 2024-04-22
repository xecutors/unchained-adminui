import { useMutation, gql } from '@apollo/client';
import PUTMedia from '../../common/utils/PUTMedia';
import useConfirmMediaUpload from '../../common/hooks/useConfirmMediaUpload';

const PrepareProductMediaUploadMutation = gql`
  mutation PrepareProductMediaUpload($mediaName: String!, $productId: ID!) {
    prepareProductMediaUpload(mediaName: $mediaName, productId: $productId) {
      _id
      putURL
      expires
    }
  }
`;

const useAddProductMedia = () => {
  const [prepareProductMediaUploadMutation] = useMutation(
    PrepareProductMediaUploadMutation,
  );
  const { confirmMediaUpload } = useConfirmMediaUpload();

  const addProductMedia = async ({ productId, media }) => {
    const { data } = await prepareProductMediaUploadMutation({
      variables: { productId, mediaName: media.name },
    });
    const { prepareProductMediaUpload } = data;
    await PUTMedia(
      media,
      prepareProductMediaUpload.putURL,
    );
    return confirmMediaUpload({
      mediaUploadTicketId: prepareProductMediaUpload._id,
      size: media?.size,
      type: media.type,
    });
  };

  return {
    addProductMedia,
  };
};

export default useAddProductMedia;
