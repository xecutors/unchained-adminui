import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const UpdateUserAvatarMutation = gql`
  mutation UpdateUserAvatar($avatar: Upload!, $userId: ID) {
    updateUserAvatar(avatar: $avatar, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUpdateUserAvatar = () => {
  const [updateUserAvatarMutation] = useMutation(UpdateUserAvatarMutation);

  const updateUserAvatar = async ({ avatar, userId = null } = {}) => {
    return updateUserAvatarMutation({
      variables: {
        avatar,
        userId,
      },
    });
  };

  return {
    updateUserAvatar,
  };
};

export default useUpdateUserAvatar;
