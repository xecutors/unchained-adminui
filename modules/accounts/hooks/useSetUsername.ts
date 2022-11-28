import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const SetUserNameMutation = gql`
  mutation SetUsername($username: String!, $userId: ID!) {
    setUsername(username: $username, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useSetUserName = () => {
  const [setUserNameMutation] = useMutation(SetUserNameMutation);

  const setUserName = async ({ username, userId }) => {
    return setUserNameMutation({
      variables: {
        username,
        userId,
      },
      refetchQueries: ['User'],
    });
  };

  return {
    setUserName,
  };
};

export default useSetUserName;
