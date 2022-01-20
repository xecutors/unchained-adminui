import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const UpdateUserProfileMutation = gql`
  mutation UpdateUserProfile($profile: UserProfileInput!, $userId: ID) {
    updateUserProfile(profile: $profile, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUpdateUserProfile = () => {
  const [updateUserProfileMutation] = useMutation(UpdateUserProfileMutation);

  const updateUserProfile = async ({ profile, userId = null } = {}) => {
    return updateUserProfileMutation({
      variables: {
        profile,
        userId,
      },
    });
  };

  return {
    updateUserProfile,
  };
};

export default useUpdateUserProfile;
