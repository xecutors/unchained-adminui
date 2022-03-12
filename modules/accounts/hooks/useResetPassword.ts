import { useMutation, gql } from '@apollo/client';
import hashPassword from '../utils/hashPassword';

const ResetPasswordMutation = gql`
  mutation ResetPassword(
    $newPassword: HashedPasswordInput
    $newPlainPassword: String
    $token: String!
  ) {
    resetPassword(
      newPassword: $newPassword
      newPlainPassword: $newPlainPassword
      token: $token
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useResetPassword = () => {
  const [resetPasswordMutation] = useMutation(ResetPasswordMutation);

  const resetPassword = async ({
    newPassword,
    token,
    disableHashing = false,
  }) => {
    console.log(newPassword);
    const variables = {
      token,
      newPlainPassword: null,
      newPassword: null,
    };
    if (disableHashing) {
      variables.newPlainPassword = newPassword;
    } else {
      variables.newPassword = hashPassword(newPassword);
    }
    return resetPasswordMutation({
      variables,
    });
  };

  return {
    resetPassword,
  };
};

export default useResetPassword;
