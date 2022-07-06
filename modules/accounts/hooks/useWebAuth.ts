import { useMutation, gql } from '@apollo/client';

const CreateWebAuthMutation = gql`
  mutation CreateWebAuthnCredentialCreationOptions($username: String!) {
    createWebAuthnCredentialCreationOptions(username: $username)
  }
`;

const useWebAuth = () => {
  const [createWebAuthMutation] = useMutation(CreateWebAuthMutation);

  const createWebAuth = async ({ username }) => {
    return createWebAuthMutation({ variables: { username } });
  };

  return { createWebAuth };
};

export default useWebAuth;
