import { useMutation, gql } from '@apollo/client';
import AssortmentMediaFragment from '../fragments/AssortmentMediaFragment';

const AddAssortmentMediaMutation = gql`
  mutation AddAssortmentMedia($assortmentId: ID!, $media: Upload!) {
    addAssortmentMedia(assortmentId: $assortmentId, media: $media) {
      ...AssortmentMediaFragment
    }
  }
  ${AssortmentMediaFragment}
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
