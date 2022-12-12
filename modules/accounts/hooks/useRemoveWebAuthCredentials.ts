import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const RemoveWebAuthCredentialsMutation = gql`
  mutation removeWebAuthCredentials($credentialsId: ID!) {
    removeWebAuthnCredentials(credentialsId: $credentialsId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useRemoveWebAuthCredentials = () => {
  const [removeWebAuthCredentialsMutation] = useMutation(
    RemoveWebAuthCredentialsMutation,
  );
  const removeWebAuthCredentials = async ({ credentialsId }) => {
    return removeWebAuthCredentialsMutation({
      variables: { credentialsId },
    });
  };

  return {
    removeWebAuthCredentials,
  };
};

export default useRemoveWebAuthCredentials;
