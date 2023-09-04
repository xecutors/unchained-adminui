import { useMutation, gql } from '@apollo/client';
import {
  IResetPasswordMutation,
  IResetPasswordMutationVariables,
} from '../../../gql/types';

const ResetPasswordMutation = gql`
  mutation ResetPassword($newPlainPassword: String, $token: String!) {
    resetPassword(newPlainPassword: $newPlainPassword, token: $token) {
      id
      token
      tokenExpires
    }
  }
`;

const useResetPassword = () => {
  const [resetPasswordMutation] = useMutation<
    IResetPasswordMutation,
    IResetPasswordMutationVariables
  >(ResetPasswordMutation);

  const resetPassword = async ({
    newPlainPassword,
    token,
  }: IResetPasswordMutationVariables) => {
    const variables = {
      token,
      newPlainPassword: null,
    };
    variables.newPlainPassword = newPlainPassword;

    return resetPasswordMutation({
      variables,
    });
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
