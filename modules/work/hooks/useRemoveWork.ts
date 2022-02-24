import { useMutation, gql } from '@apollo/client';

const RemoveWorkMutation = gql`
  mutation RemoveWork($workId: ID!) {
    removeWork(workId: $workId) {
      _id
    }
  }
`;

const useRemoveWork = () => {
  const [removeWorkMutation] = useMutation(RemoveWorkMutation);

  const removeWork = async ({ workId }: { workId: string }) => {
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
