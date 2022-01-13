import { useMutation, gql } from '@apollo/client';

const SetRoleMutation = gql`
  mutation SetRoles($roles: [String!]!, $userId: ID!) {
    setRoles(roles: $roles, userId: $userId) {
      _id
    }
  }
`;

const useSetRoles = () => {
  const [setRoleMutation] = useMutation(SetRoleMutation);

  const setRoles = async ({ roles = [], userId = null } = {}) => {
    return setRoleMutation({
      variables: {
        roles,
        userId,
      },
    });
  };

  return {
    setRoles,
  };
};

export default useSetRoles;
