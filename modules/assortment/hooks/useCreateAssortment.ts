import { useMutation, gql } from '@apollo/client';
import {
  ICreateAssortmentInput,
  ICreateAssortmentMutation,
  ICreateAssortmentMutationVariables,
} from '../../../gql/types';
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
  const [createAssortmentMutation, { data, error, loading }] = useMutation<
    ICreateAssortmentMutation,
    ICreateAssortmentMutationVariables
  >(CreateAssortmentMutation);

  const createAssortment = async ({
    isRoot = false,
    tags = [],
    texts,
  }: ICreateAssortmentInput) => {
    return createAssortmentMutation({
      variables: { assortment: { isRoot, texts, tags } },
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
