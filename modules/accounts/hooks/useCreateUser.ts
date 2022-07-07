import { useMutation, gql } from '@apollo/client';
import hashPassword from '../utils/hashPassword';

const CreateUserMutation = gql`
  mutation CreateUser(
    $username: String
    $email: String
    $password: HashedPasswordInput
    $plainPassword: String
    $profile: UserProfileInput
    $webAuthnPublicKeyCredentials: JSON
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      plainPassword: $plainPassword
      profile: $profile
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useCreateUser = () => {
  const [createUserMutation, { data, error, loading }] =
    useMutation(CreateUserMutation);

  const createUser = async ({
    username,
    email,
    password,
    profile,
    disableHashing = false,
    webAuthnPublicKeyCredentials,
  }) => {
    const variables = {
      username,
      email,
      profile,
      plainPassword: null,
      password: null,
      webAuthnPublicKeyCredentials,
    };
    if (disableHashing) {
      variables.plainPassword = password;
    } else {
      variables.password = hashPassword(password);
    }
    return createUserMutation({
      variables,
      refetchQueries: ['Users'],
    });
  };
  const newUser = data?.createUser;

  return {
    createUser,
    newUser,
    error,
    loading,
  };
};

export default useCreateUser;
