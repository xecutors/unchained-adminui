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

  const updateAssortment = async ({ assortment, assortmentId }) => {
    return updateAssortmentMutation({
      variables: { assortment, assortmentId },
      refetchQueries: ['Assortment'],
    });
  };

  return {
    updateAssortment,
  };
};

export default useUpdateAssortment;
