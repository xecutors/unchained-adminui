import { useMutation, gql } from '@apollo/client';

const ReOrderProductMutation = gql`
  mutation ReOrderProductMedia($sortKeys: [ReorderProductMediaInput!]!) {
    reorderProductMedia(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReOrderProductMedia = () => {
  const [reOrderProductMutation] = useMutation(ReOrderProductMutation);

  const reOrderProductMedia = async ({ sortKeys }) => {
    return reOrderProductMutation({
      variables: { sortKeys },
      refetchQueries: ['Products'],
    });
  };

  return {
    reOrderProductMedia,
  };
};

export default useReOrderProductMedia;
