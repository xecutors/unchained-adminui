import { useMutation, gql } from '@apollo/client';

const ConfirmMediaUploadMutation = gql`
  mutation ConfirmMediaUpload(
    $mediaUploadTicketId: ID!
    $size: Int!
    $type: String!
  ) {
    confirmMediaUpload(
      mediaUploadTicketId: $mediaUploadTicketId
      size: $size
      type: $type
    ) {
      _id
      name
      type
      size
      url
    }
  }
`;

const useConfirmMediaUpload = () => {
  const [confirmMediaUploadMutation] = useMutation(ConfirmMediaUploadMutation);

  const confirmMediaUpload = async ({ mediaUploadTicketId, size, type }) => {
    return confirmMediaUploadMutation({
      variables: { mediaUploadTicketId, size, type },
    });
  };

  return {
    confirmMediaUpload,
  };
};

export default useConfirmMediaUpload;
