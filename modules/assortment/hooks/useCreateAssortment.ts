import { useMutation, gql } from '@apollo/client';

const CreateAssortmentMutation = gql`
  mutation CreateAssortment($assortment: CreateAssortmentInput!) {
    createAssortment(assortment: $assortment) {
      _id
    }
  }
`;

const useCreateAssortment = () => {
  const [createAssortmentMutation] = useMutation(CreateAssortmentMutation);

  const createAssortment = async ({ isRoot = false, tags = [], title }) => {
    return createAssortmentMutation({
      variables: { assortment: { isRoot, title, tags } },
      refetchQueries: ['Assortments'],
    });
  };

  return {
    createAssortment,
  };
};

export default useCreateAssortment;
