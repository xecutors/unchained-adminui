import { useMutation, gql } from '@apollo/client';

const UpdateUserProfileMutation = gql`
  mutation UpdateUserProfile($profile: UserProfileInput!, $userId: ID) {
    updateUserProfile(profile: $profile, userId: $userId) {
      _id
    }
  }
`;

const useUpdateUserProfile = () => {
  const [updateUserProfileMutation] = useMutation(UpdateUserProfileMutation);

  const updateUserProfile = async ({ profile, userId = null } = {}) => {
    return updateUserProfileMutation({
      variables: {
        profile,
        userId,
      },
      refetchQueries: ['User'],
    });
  };

  return {
    updateUserProfile,
  };
};

export default useUpdateUserProfile;
