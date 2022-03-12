import { useMutation, gql } from '@apollo/client';

const SetUserTagsMutation = gql`
  mutation setUserTags($tags: [String]!, $userId: ID!) {
    setUserTags(tags: $tags, userId: $userId) {
      _id
      tags
    }
  }
`;

const useSetUserTags = () => {
  const [setUserTagsMutation] = useMutation(SetUserTagsMutation);

  const setUserTags = async ({ tags = [], userId = null } = {}) => {
    return setUserTagsMutation({
      variables: {
        tags,
        userId,
      },
    });
  };

  return {
    setUserTags,
  };
};

export default useSetUserTags;
