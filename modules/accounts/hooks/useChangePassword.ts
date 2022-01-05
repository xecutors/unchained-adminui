import { useMutation, gql } from '@apollo/client';

const ChangePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(
      oldPlainPassword: $oldPassword
      newPlainPassword: $newPassword
    ) {
      success
    }
  }
`;

const useChangePassword = () => {
  const [changePasswordMutation] = useMutation(ChangePasswordMutation);

  const changePassword = async ({
    oldPassword = undefined,
    newPassword = undefined,
  }) => {
    return changePasswordMutation({
      variables: { oldPassword, newPassword },
    });
  };

  return {
    changePassword,
  };
};

export default useChangePassword;
