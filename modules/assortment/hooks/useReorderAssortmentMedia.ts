import { useMutation, gql } from '@apollo/client';

const ReorderAssortmentMediaMutation = gql`
  mutation ReorderAssortmentMedia($sortKeys: [ReorderAssortmentMediaInput!]!) {
    reorderAssortmentMedia(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReorderAssortmentMedia = () => {
  const [reorderAssortmentMediaMutation] = useMutation(
    ReorderAssortmentMediaMutation,
  );

  const reorderAssortmentMedia = async ({ sortKeys }) => {
    return reorderAssortmentMediaMutation({
      variables: { sortKeys },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    reorderAssortmentMedia,
  };
};

export default useReorderAssortmentMedia;
