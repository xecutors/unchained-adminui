import { useMutation, gql } from '@apollo/client';

export const IMPERSONATE_MUTATION = gql`
  mutation Impersonate($userId: ID!) {
    impersonate(userId: $userId) {
      id
      tokenExpires
      token
      user {
        _id
      }
    }
  }
`;

const useImpersonate = () => {
  const [impersonateAsMutation, { client }] = useMutation(IMPERSONATE_MUTATION);

  const impersonateAs = async ({ userId }) => {
    const result = await impersonateAsMutation({
      variables: {
        userId,
      },
      awaitRefetchQueries: true,
      refetchQueries: ['User'],
    });
    await client.resetStore();
    return result;
  };

  return {
    impersonateAs,
  };
};

export default useImpersonate;
