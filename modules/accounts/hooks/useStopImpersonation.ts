import { useMutation, gql } from '@apollo/client';
import {
  IStopImpersonateMutation,
  IStopImpersonateMutationVariables,
} from '../../../gql/types';

const STOP_IMPERSONATION_MUTATION = gql`
  mutation StopImpersonate {
    stopImpersonation {
      _id
      token
      tokenExpires
    }
  }
`;

const useStopImpersonation = () => {
  const [stopImpersonationMutation, { client }] = useMutation<
    IStopImpersonateMutation,
    IStopImpersonateMutationVariables
  >(STOP_IMPERSONATION_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: ['User'],
  });

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
