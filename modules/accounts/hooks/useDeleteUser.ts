import { gql, useMutation } from '@apollo/client';
const DeleteUserMutation = gql`
  mutation DeleteUser($userId: ID) {
    deleteUser(userId: $userId)
  }
`;
const useDeleteUser = () => {
  const [deleteUserMutation] = useMutation(DeleteUserMutation);

  const deleteUser = async (userId = undefined) => {
    return deleteUserMutation({
      variables: {
        userId,
      },
    });
  };

  return {
    deleteUser,
  };
};

export default useDeleteUser;
