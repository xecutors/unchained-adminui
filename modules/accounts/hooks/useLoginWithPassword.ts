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
  const [logInWithPasswordMutation, { client }] = useMutation<
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
    const result = await logInWithPasswordMutation({
      variables,
      notifyOnNetworkStatusChange: true,
      awaitRefetchQueries: true,
    });
    await client.resetStore();
    return result;
  };

  return {
    logInWithPassword,
  };
};

export default useLoginWithPassword;
