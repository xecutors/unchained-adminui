import { useMutation, gql } from '@apollo/client';

export const STOP_IMPERSONATION_MUTATION = gql`
  mutation StopImpersonate {
    stopImpersonation {
      id
      token
      tokenExpires
    }
  }
`;

const useStopImpersonation = () => {
  const [stopImpersonationMutation, { client }] = useMutation(
    STOP_IMPERSONATION_MUTATION,
    {
      awaitRefetchQueries: true,
      refetchQueries: ['User'],
    },
  );

  const stopImpersonation = async () => {
    const result = await stopImpersonationMutation();
    await client.resetStore();
    return result;
  };

  return {
    stopImpersonation,
  };
};

export default useStopImpersonation;
