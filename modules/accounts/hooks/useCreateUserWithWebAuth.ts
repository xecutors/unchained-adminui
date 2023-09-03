import { useMutation, gql } from '@apollo/client';
import {
  ICreateUserWithWebAuthMutation,
  ICreateUserWithWebAuthMutationVariables,
} from '../../../gql/types';

const CreateUserWithWebAuthMutation = gql`
  mutation CreateUserWithWebAuthMutation(
    $username: String
    $email: String
    $webAuthnPublicKeyCredentials: JSON
  ) {
    createUser(
      username: $username
      email: $email
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;

const useCreateUserWithWebAuth = () => {
  const [createUserWithWebAuthMutation, { data, error, loading }] = useMutation<
    ICreateUserWithWebAuthMutation,
    ICreateUserWithWebAuthMutationVariables
  >(CreateUserWithWebAuthMutation);

  const createUserWithWebAuth = async ({
    username,
    email,
    webAuthnPublicKeyCredentials,
  }: ICreateUserWithWebAuthMutationVariables) => {
    const variables = {
      username,
      email,
      webAuthnPublicKeyCredentials,
    };

    return createUserWithWebAuthMutation({
      variables,
      refetchQueries: ['Users'],
    });
  };
  const newUser = data?.createUser;

  return {
    createUserWithWebAuth,
    newUser,
    error,
    loading,
  };
};

export default useCreateUserWithWebAuth;
