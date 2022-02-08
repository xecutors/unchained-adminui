import { useMutation, gql } from '@apollo/client';

const SetBaseAssortmentMutation = gql`
  mutation SetBaseAssortment($assortmentId: ID!) {
    setBaseAssortment(assortmentId: $assortmentId) {
      _id
    }
  }
`;

const useSetBaseAssortment = () => {
  const [setBaseAssortmentMutation] = useMutation(SetBaseAssortmentMutation);

  const setBaseAssortment = async ({ assortmentId }) => {
    return setBaseAssortmentMutation({
      variables: { assortmentId },
      refetchQueries: ['Assortment'],
    });
  };

  return {
    setBaseAssortment,
  };
};

export default useSetBaseAssortment;
