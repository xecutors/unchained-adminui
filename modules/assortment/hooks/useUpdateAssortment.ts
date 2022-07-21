import { useMutation, gql } from '@apollo/client';

const UpdateAssortmentMutation = gql`
  mutation UpdateAssortment(
    $assortment: UpdateAssortmentInput!
    $assortmentId: ID!
  ) {
    updateAssortment(assortment: $assortment, assortmentId: $assortmentId) {
      _id
    }
  }
`;

const useUpdateAssortment = () => {
  const [updateAssortmentMutation] = useMutation(UpdateAssortmentMutation);

  const updateAssortment = async ({
    isRoot,
    assortmentId,
    tags,
    sequence,
    isActive,
  }) => {
    return updateAssortmentMutation({
      variables: {
        assortment: { isRoot, tags, sequence, isActive },
        assortmentId,
      },
      refetchQueries: ['Assortment', 'Assortments'],
    });
  };

  return {
    updateAssortment,
  };
};

export default useUpdateAssortment;
