import { useMutation, gql } from '@apollo/client';

const AddAssortmentMediaMutation = gql`
  mutation AddAssortmentMedia($assortmentId: ID!, $media: Upload!) {
    addAssortmentMedia(assortmentId: $assortmentId, media: $media) {
      _id
    }
  }
`;

const useAddAssortmentMedia = () => {
  const [addAssortmentMediaMutation] = useMutation(AddAssortmentMediaMutation);

  const addAssortmentMedia = async ({ assortmentId, media }) => {
    return addAssortmentMediaMutation({
      variables: { assortmentId, media },
      refetchQueries: ['AssortmentMedia'],
    });
  };

  return {
    addAssortmentMedia,
  };
};

export default useAddAssortmentMedia;
