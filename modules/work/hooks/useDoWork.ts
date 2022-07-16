import { useMutation, gql } from '@apollo/client';

const DoWorkMutation = gql`
  mutation DoWork($type: WorkType!, $input: JSON) {
    doWork(type: $type, input: $input) {
      result
      error
      success
    }
  }
`;

const useDoWork = () => {
  const [doWorkMutation] = useMutation(DoWorkMutation);

  const doWork = async ({ type, input }: { type: string; input?: JSON }) => {
    return doWorkMutation({
      variables: {
        type,
        input,
      },
      refetchQueries: ['WorkQueue'],
    });
  };

  return {
    doWork,
  };
};

export default useDoWork;
