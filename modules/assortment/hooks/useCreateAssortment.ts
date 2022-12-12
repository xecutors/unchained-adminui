import { useMutation, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/AssortmentFragment';

const CreateAssortmentMutation = gql`
  mutation CreateAssortment($assortment: CreateAssortmentInput!) {
    createAssortment(assortment: $assortment) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useCreateAssortment = () => {
  const [createAssortmentMutation, { data, error, loading }] = useMutation(
    CreateAssortmentMutation,
  );

  const createAssortment = async ({ isRoot = false, tags = [], title }) => {
    return createAssortmentMutation({
      variables: { assortment: { isRoot, title, tags } },
      refetchQueries: ['Assortments'],
    });
  };
  const newAssortment = data?.createAssortment;
  return {
    createAssortment,
    loading,
    newAssortment,
    error,
  };
};

export default useCreateAssortment;
