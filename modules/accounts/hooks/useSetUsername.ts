import { useMutation, gql } from '@apollo/client';

const SetUserNameMutation = gql`
  mutation SetUsername($username: String!, $userId: ID!) {
    setUsername(username: $username, userId: $userId) {
      _id
    }
  }
`;

const useSetUserName = () => {
  const [setUserNameMutation] = useMutation(SetUserNameMutation);

  const setUserName = async ({ username, userId }) => {
    return setUserNameMutation({
      variables: {
        username,
        userId,
      },
    });
  };

  return {
    setUserName,
  };
};

export default useSetUserName;
