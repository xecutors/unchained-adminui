import { useMutation, gql } from '@apollo/client';
import {
  IDisableTotpMutation,
  IDisableTotpMutationVariables,
} from '../../../gql/types';
import UserFragment from '../fragment/UserFragment';

const DisableTOTPMutation = gql`
  mutation DisableTOTP($code: String!, $userId: ID) {
    disableTOTP(code: $code, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useDisableTOTP = () => {
  const [disableTOTPMutation] = useMutation<
    IDisableTotpMutation,
    IDisableTotpMutationVariables
  >(DisableTOTPMutation);

  const disableTOTP = async ({
    code,
    userId = null,
  }: IDisableTotpMutationVariables) => {
    return disableTOTPMutation({
      variables: {
        code,
        userId,
      },
    });
  };

  return {
    disableTOTP,
  };
};

export default useDisableTOTP;
