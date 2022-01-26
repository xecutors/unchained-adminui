import { useMutation, gql } from '@apollo/client';

const AddWorkMutation = gql`
  mutation addWork(
    $type: WorkType!
    $priority: Int!
    $input: JSON
    $originalWorkId: ID
    $scheduled: Date
    $retries: Int!
  ) {
    addWork(
      type: $type
      priority: $priority
      input: $input
      originalWorkId: $originalWorkId
      scheduled: $scheduled
      retries: $retries
    ) {
      _id
    }
  }
`;

const useAddWork = () => {
  const [addWorkMutation] = useMutation(AddWorkMutation);

  const addWork = async ({
    type,
    priority,
    input,
    originalWorkId,
    scheduled = null,
    retries,
  }: {
    type: string;
    priority: number;
    input?: JSON;
    originalWorkId?: string;
    scheduled?: number;
    retries: number;
  }) => {
    return addWorkMutation({
      variables: {
        type,
        priority,
        input,
        originalWorkId,
        scheduled,
        retries,
      },
      refetchQueries: ['WorkQueue'],
    });
  };

  return {
    addWork,
  };
};

export default useAddWork;
