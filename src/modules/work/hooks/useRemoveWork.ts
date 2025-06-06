import { useMutation, gql } from '@apollo/client';
import {
  IRemoveWorkMutation,
  IRemoveWorkMutationVariables,
} from '../../../gql/types';

const RemoveWorkMutation = gql`
  mutation RemoveWork($workId: ID!) {
    removeWork(workId: $workId) {
      _id
    }
  }
`;

const useRemoveWork = () => {
  const [removeWorkMutation] = useMutation<
    IRemoveWorkMutation,
    IRemoveWorkMutationVariables
  >(RemoveWorkMutation);

  const removeWork = async ({ workId }: IRemoveWorkMutationVariables) => {
    return removeWorkMutation({
      variables: {
        workId,
      },
      refetchQueries: ['WorkQueue'],
    });
  };

  return {
    removeWork,
  };
};

export default useRemoveWork;
