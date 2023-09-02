import { useMutation, gql } from '@apollo/client';
import {
  ICreateUserMutation,
  ICreateUserMutationVariables,
} from '../../../gql/types';

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
  const [createUserMutation, { data, error, loading }] = useMutation<
    ICreateUserMutation,
    ICreateUserMutationVariables
  >(CreateUserMutation);

  const createUser = async ({
    username,
    email,
    plainPassword,
    profile,
    webAuthnPublicKeyCredentials,
  }: ICreateUserMutationVariables) => {
    const variables = {
      username: null,
      email: null,
      profile,
      plainPassword: null,
      webAuthnPublicKeyCredentials,
    };
    if (email) {
      variables.email = email;
    }
    if (username) {
      variables.username = username;
    }
    variables.plainPassword = plainPassword;
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
