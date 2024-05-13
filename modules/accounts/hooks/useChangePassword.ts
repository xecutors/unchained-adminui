import { useMutation, gql } from '@apollo/client';
import {
  IChangePasswordMutation,
  IChangePasswordMutationVariables,
} from '../../../gql/types';

const ChangePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
    }
  }
`;

const useChangePassword = () => {
  const [changePasswordMutation] = useMutation<
    IChangePasswordMutation,
    IChangePasswordMutationVariables
  >(ChangePasswordMutation);

  const changePassword = async ({
    oldPassword = undefined,
    newPassword = undefined,
  }: IChangePasswordMutationVariables) => {
    return changePasswordMutation({
      variables: { oldPassword, newPassword },
    });
  };

  return {
    changePassword,
  };
};

export default useChangePassword;
