import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const SetPasswordMutation = gql`
  mutation SetPassword($newPlainPassword: String, $userId: ID!) {
    setPassword(newPlainPassword: $newPlainPassword, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useSetPassword = () => {
  const [setPasswordMutation] = useMutation(SetPasswordMutation);

  const setPassword = async ({ newPassword = undefined, userId }) => {
    const variables = { newPlainPassword: null, newPassword: null, userId };
    variables.newPlainPassword = newPassword;
    return setPasswordMutation({ variables });
  };

  return {
    setPassword,
  };
};

export default useSetPassword;
