import { useMutation, gql } from '@apollo/client';
import {
  IReOrderProductMediaMutation,
  IReOrderProductMediaMutationVariables,
} from '../../../gql/types';

const ReOrderProductMediaMutation = gql`
  mutation ReOrderProductMedia($sortKeys: [ReorderProductMediaInput!]!) {
    reorderProductMedia(sortKeys: $sortKeys) {
      _id
    }
  }
`;

const useReOrderProductMedia = () => {
  const [reOrderProductMutation] = useMutation<
    IReOrderProductMediaMutation,
    IReOrderProductMediaMutationVariables
  >(ReOrderProductMediaMutation);

  const reOrderProductMedia = async ({
    sortKeys,
  }: IReOrderProductMediaMutationVariables) => {
    return reOrderProductMutation({
      variables: { sortKeys },
      refetchQueries: ['ProductMedia'],
    });
  };

  return {
    reOrderProductMedia,
  };
};

export default useReOrderProductMedia;
