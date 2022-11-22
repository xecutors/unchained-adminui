import { useMutation, gql } from '@apollo/client';
import isEmail from '../../common/utils/isEmail';

const CreateUserMutation = gql`
  mutation CreateUser(
    $username: String
    $email: String
    $plainPassword: String
    $profile: UserProfileInput
    $webAuthnPublicKeyCredentials: JSON
  ) {
    createUser(
      username: $username
      email: $email
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
    usernameOrEmail,
    password,
    profile,
    webAuthnPublicKeyCredentials,
  }) => {
    const variables = {
      username: null,
      email: null,
      profile,
      plainPassword: null,
      webAuthnPublicKeyCredentials,
    };
    if (isEmail(usernameOrEmail)) {
      variables.email = usernameOrEmail;
    } else if (typeof usernameOrEmail === 'string') {
      variables.username = usernameOrEmail;
    }
    variables.plainPassword = password;
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
