import { useMutation, gql } from '@apollo/client';
import hashPassword from '../utils/hashPassword';

const LogInWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $username: String
    $email: String
    $password: HashedPasswordInput
    $plainPassword: String
  ) {
    loginWithPassword(
      username: $username
      email: $email
      password: $password
      plainPassword: $plainPassword
    ) {
      id
      token
      tokenExpires
      user {
        _id
        allowedActions
        roles
      }
    }
  }
`;

const useLoginWithPassword = () => {
  const [logInWithPasswordMutation] = useMutation(LogInWithPasswordMutation, {
    errorPolicy: 'all',
  });

  const logInWithPassword = async ({
    username,
    email,
    password,

    /* totpCode, */
    disableHashing = false,
  }) => {
    const normalizedEmail = email?.trim();

    const variables = {
      username,
      email: normalizedEmail,
      /* totpCode, */
      plainPassword: null,
      password: null,
    };
    if (disableHashing) {
      variables.plainPassword = password;
    } else {
      variables.password = hashPassword(password);
    }
    return logInWithPasswordMutation({
      variables,
    });
  };

  return {
    logInWithPassword,
  };
};

export default useLoginWithPassword;
