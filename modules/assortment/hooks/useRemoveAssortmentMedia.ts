import { useMutation, gql } from '@apollo/client';

const RemoveAssortmentMediaMutation = gql`
  mutation RemoveAssortmentMedia($assortmentMediaId: ID!) {
    removeAssortmentMedia(assortmentMediaId: $assortmentMediaId) {
      _id
    }
  }
`;

const useRemoveAssortmentMedia = () => {
  const [removeAssortmentMediaMutation] = useMutation(
    RemoveAssortmentMediaMutation,
  );

  const removeAssortmentMedia = async ({ assortmentMediaId }) => {
    return removeAssortmentMediaMutation({
      variables: { assortmentMediaId },
      refetchQueries: ['AssortmentMedia'],
    });
  };

  return {
    removeAssortmentMedia,
  };
};

export default useRemoveAssortmentMedia;
