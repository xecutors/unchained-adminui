import { useMutation, gql } from '@apollo/client';
import hashPassword from '../utils/hashPassword';

const isEmail = (str) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regexExp.test(str);
};

const LogInWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $username: String
    $email: String
    $password: HashedPasswordInput
    $plainPassword: String
    $totpCode: String
  ) {
    loginWithPassword(
      username: $username
      email: $email
      password: $password
      plainPassword: $plainPassword
      totpCode: $totpCode
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
    usernameOrEmail,
    password,
    totpCode,
    disableHashing = false,
  }) => {
    const variables = {
      username: null,
      email: null,
      totpCode,
      plainPassword: null,
      password: null,
    };

    if (isEmail(usernameOrEmail)) {
      const normalizedEmail = usernameOrEmail?.trim();
      variables.email = normalizedEmail;
    } else {
      variables.username = usernameOrEmail;
    }

    if (disableHashing) {
      variables.plainPassword = password;
    } else {
      variables.password = hashPassword(password);
    }
    return logInWithPasswordMutation({
      variables,
      notifyOnNetworkStatusChange: true,
    });
  };

  return {
    logInWithPassword,
  };
};

export default useLoginWithPassword;
