import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const SetRoleMutation = gql`
  mutation SetRoles($roles: [String!]!, $userId: ID!) {
    setRoles(roles: $roles, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useSetRoles = () => {
  const [setRoleMutation] = useMutation(SetRoleMutation);

  const setRoles = async ({ roles = [], userId = null } = {}) => {
    return setRoleMutation({
      variables: {
        roles,
        userId,
      },
      refetchQueries: ['User'],
    });
  };

  return {
    setRoles,
  };
};

export default useSetRoles;
