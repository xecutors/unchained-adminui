import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';
import hashPassword from '../utils/hashPassword';

const EnrollUserMutation = gql`
  mutation EnrollUser(
    $email: String!
    $password: HashedPasswordInput
    $plainPassword: String
    $profile: UserProfileInput!
  ) {
    enrollUser(
      email: $email
      password: $password
      plainPassword: $plainPassword
      profile: $profile
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useEnrollUser = () => {
  const [enrollUserMutation, { data, error, loading }] =
    useMutation(EnrollUserMutation);

  const enrollUser = async ({
    email,
    password,
    profile,
    disableHashing = false,
  }) => {
    const variables = {
      email,
      profile,
      plainPassword: null,
      password: null,
    };
    if (disableHashing) {
      variables.plainPassword = password;
    } else {
      variables.password = hashPassword(password);
    }
    return enrollUserMutation({
      variables,
      refetchQueries: ['Users'],
    });
  };
  const newUser = data?.enrollUser;

  return {
    enrollUser,
    newUser,
    error,
    loading,
  };
};

export default useEnrollUser;
