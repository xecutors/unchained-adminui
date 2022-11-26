import { useMutation, gql } from '@apollo/client';

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
  const [resetPasswordMutation] = useMutation(ResetPasswordMutation);

  const resetPassword = async ({ newPassword, token }) => {
    const variables = {
      token,
      newPlainPassword: null,
    };
    variables.newPlainPassword = newPassword;

    return resetPasswordMutation({
      variables,
    });
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
