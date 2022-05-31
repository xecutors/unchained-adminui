import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';
import hashPassword from '../utils/hashPassword';

const SetPasswordMutation = gql`
  mutation SetPassword(
    $newPassword: HashedPasswordInput
    $newPlainPassword: String
    $userId: ID!
  ) {
    setPassword(
      newPassword: $newPassword
      newPlainPassword: $newPlainPassword
      userId: $userId
    ) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useSetPassword = () => {
  const [setPasswordMutation] = useMutation(SetPasswordMutation);

  const setPassword = async ({
    newPassword = undefined,
    disableHashing = false,
    userId,
  }) => {
    const variables = { newPlainPassword: null, newPassword: null, userId };
    if (disableHashing) {
      variables.newPlainPassword = newPassword;
    } else {
      variables.newPassword = hashPassword(newPassword);
    }

    return setPasswordMutation({ variables });
  };

  return {
    setPassword,
  };
};

export default useSetPassword;
