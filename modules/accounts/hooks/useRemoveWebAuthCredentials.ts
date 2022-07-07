import { useMutation, gql } from '@apollo/client';

const RemoveWebAuthnCredentialsMutation = gql`
  mutation RemoveWebAuthnCredentials($credentialsId: ID!) {
    removeWebAuthnCredentials(credentialsId: $credentialsId) {
      _id
    }
  }
`;

const useRemoveWebAuthnCredentials = () => {
  const [removeWebAuthnCredentialsMutation] = useMutation(
    RemoveWebAuthnCredentialsMutation,
  );

  const removeWebAuthnCredentials = async ({ credentialsId }) => {
    return removeWebAuthnCredentialsMutation({
      variables: { credentialsId },
      refetchQueries: ['UserWebAuthnCredentials'],
    });
  };

  return {
    removeWebAuthnCredentials,
  };
};

export default useRemoveWebAuthnCredentials;
