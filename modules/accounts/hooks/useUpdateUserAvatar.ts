import { useMutation, gql } from '@apollo/client';
import {
  IUpdateUserAvatarMutation,
  IUpdateUserAvatarMutationVariables,
} from '../../../gql/types';
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
  const [updateUserAvatarMutation] = useMutation<
    IUpdateUserAvatarMutation,
    IUpdateUserAvatarMutationVariables
  >(UpdateUserAvatarMutation);

  const updateUserAvatar = async ({
    avatar,
    userId = null,
  }: IUpdateUserAvatarMutationVariables) => {
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
