import { useMutation, gql } from '@apollo/client';

const RemoveWebAuthnCredentialsMutation = gql`
  mutation RemoveWebAuthnCredentials {
  removeWebAuthnCredentials(credentialsId: ID!) {
    _id
    
  }
}
`;

const useRemoveWebAuthnCredentials = () => {
  const [removeWebAuthnCredentialsMutation] = useMutation(
    RemoveWebAuthnCredentialsMutation,
  );

  const removeWebAuthnCredentials = async ({ credentials }) => {
    return removeWebAuthnCredentialsMutation({
      variables: { credentials },
      refetchQueries: ['WebAuthnCredentials'],
    });
  };

  return {
    removeWebAuthnCredentials,
  };
};

export default useRemoveWebAuthnCredentials;
