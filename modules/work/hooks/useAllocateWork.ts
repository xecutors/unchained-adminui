import { useMutation, gql } from '@apollo/client';

const AllocateWorkMutation = gql`
  mutation AllocateWork($types: [WorkType], $worker: String) {
    allocateWork(types: $types, worker: $worker) {
      _id
    }
  }
`;

const useAllocateWork = () => {
  const [allocateWorkMutation] = useMutation(AllocateWorkMutation);

  const allocateWork = async ({
    types,
    worker,
  }: {
    types: [string];
    worker?: string;
  }) => {
    return allocateWorkMutation({
      variables: {
        types,
        worker,
      },
      refetchQueries: ['WorkQueue'],
    });
  };

  return {
    allocateWork,
  };
};

export default useAllocateWork;
