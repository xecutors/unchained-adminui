import { useMutation, gql } from '@apollo/client';
import useConfirmMediaUpload from '../../common/hooks/useConfirmMediaUpload';
import PUTMedia from '../../common/utils/PUTMedia';

const PrepareAssortmentMediaUploadMutation = gql`
  mutation PrepareAssortmentMediaUpload(
    $mediaName: String!
    $assortmentId: ID
  ) {
    prepareAssortmentMediaUpload(
      mediaName: $mediaName
      assortmentId: $assortmentId
    ) {
      _id
      putURL
      expires
    }
  }
`;

const useAddAssortmentMedia = () => {
  const [prepareAssortmentMediaUploadMutation] = useMutation(
    PrepareAssortmentMediaUploadMutation,
  );
  const { confirmMediaUpload } = useConfirmMediaUpload();
  const addAssortmentMedia = async ({ assortmentId, media }) => {
    const { data } = await prepareAssortmentMediaUploadMutation({
      variables: { assortmentId, mediaName: media.name },
    });

    const { prepareAssortmentMediaUpload } = data;
    const uploadedMedia = await PUTMedia(
      media,
      prepareAssortmentMediaUpload.putURL,
    );
    await confirmMediaUpload({
      mediaUploadTicketId: prepareAssortmentMediaUpload._id,
      size: 1000,
      type: 'image/jpeg',
    });
  };
  return {
    addAssortmentMedia,
  };
};

export default useAddAssortmentMedia;
