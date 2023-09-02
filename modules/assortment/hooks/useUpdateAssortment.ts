import { useMutation, gql } from '@apollo/client';
import {
  IUpdateAssortmentMutation,
  IUpdateAssortmentMutationVariables,
} from '../../../gql/types';
import AssortmentFragment from '../fragments/AssortmentFragment';

const UpdateAssortmentMutation = gql`
  mutation UpdateAssortment(
    $assortment: UpdateAssortmentInput!
    $assortmentId: ID!
  ) {
    updateAssortment(assortment: $assortment, assortmentId: $assortmentId) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragment}
`;

const useUpdateAssortment = () => {
  const [updateAssortmentMutation] = useMutation<
    IUpdateAssortmentMutation,
    IUpdateAssortmentMutationVariables
  >(UpdateAssortmentMutation);

  const updateAssortment = async ({
    isRoot,
    assortmentId,
    tags,
    sequence,
    isActive,
  }: IUpdateAssortmentMutationVariables & {
    isRoot: boolean;
    tags?: string[];
    sequence?: number;
    isActive?: boolean;
  }) => {
    return updateAssortmentMutation({
      variables: {
        assortment: { isRoot, tags, sequence, isActive },
        assortmentId,
      },
    });
  };

  return {
    updateAssortment,
  };
};

export default useUpdateAssortment;
