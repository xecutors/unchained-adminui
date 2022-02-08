import { useMutation, gql } from '@apollo/client';

const RemoveAssortmentMutation = gql`
  mutation RemoveAssortment($assortmentId: ID!) {
    removeAssortment(assortmentId: $assortmentId) {
      _id
    }
  }
`;

const useRemoveAssortment = () => {
  const [removeAssortmentMutation] = useMutation(RemoveAssortmentMutation);

  const removeAssortment = async ({ assortmentId }) => {
    return removeAssortmentMutation({
      variables: { assortmentId },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    removeAssortment,
  };
};

export default useRemoveAssortment;
