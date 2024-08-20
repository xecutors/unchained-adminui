import { gql, useMutation } from '@apollo/client';
const DeleteAccountMutation = gql`
  mutation DeleteAccount($userId: ID) {
    deleteAccount(userId: $userId)
  }
`;
const useDeleteAccount = () => {
  const [deleteAccountMutation] = useMutation(DeleteAccountMutation);

  const deleteAccount = async (userId = undefined) => {
    return deleteAccountMutation({
      variables: {
        userId,
      },
    });
  };

  return {
    deleteAccount,
  };
};

export default useDeleteAccount;
