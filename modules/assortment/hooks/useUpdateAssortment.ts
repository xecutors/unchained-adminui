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

  const updateAssortment = async ({ isRoot, assortmentId, tags, sequence }) => {
    return updateAssortmentMutation({
      variables: { assortment: { isRoot, tags, sequence }, assortmentId },
      refetchQueries: ['Assortment'],
    });
  };

  return {
    updateAssortment,
  };
};

export default useUpdateAssortment;
