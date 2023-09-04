import { useMutation, gql } from '@apollo/client';
import {
  ISetPasswordMutation,
  ISetPasswordMutationVariables,
} from '../../../gql/types';
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
  const [setPasswordMutation] = useMutation<
    ISetPasswordMutation,
    ISetPasswordMutationVariables
  >(SetPasswordMutation);

  const setPassword = async ({
    newPlainPassword = undefined,
    userId,
  }: ISetPasswordMutationVariables) => {
    const variables = { newPlainPassword, userId };
    return setPasswordMutation({ variables });
  };

  return {
    setPassword,
  };
};

export default useSetPassword;
