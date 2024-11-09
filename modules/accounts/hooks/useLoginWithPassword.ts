import { useMutation, gql } from '@apollo/client';
import {
  ILoginWithPasswordMutation,
  ILoginWithPasswordMutationVariables,
} from '../../../gql/types';
import isEmail from '../../common/utils/isEmail';

const LogInWithPasswordMutation = gql`
  mutation LoginWithPassword(
    $username: String
    $email: String
    $plainPassword: String
  ) {
    loginWithPassword(
      username: $username
      email: $email
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
  const [logInWithPasswordMutation] = useMutation<
    ILoginWithPasswordMutation,
    ILoginWithPasswordMutationVariables
  >(LogInWithPasswordMutation, {
    errorPolicy: 'all',
  });

  const logInWithPassword = async ({ usernameOrEmail, password }) => {
    const variables = {
      username: null,
      email: null,
      plainPassword: null,
    };

    if (isEmail(usernameOrEmail)) {
      const normalizedEmail = usernameOrEmail?.trim();
      variables.email = normalizedEmail;
    } else {
      variables.username = usernameOrEmail;
    }

    variables.plainPassword = password;
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
