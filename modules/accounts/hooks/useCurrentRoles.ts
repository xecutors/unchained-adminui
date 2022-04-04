import { gql, useQuery } from '@apollo/client';

const CurrentUserQuery = gql`
  query currentUser {
    me {
      _id
      allowedActions
    }
  }
`;

const useCurrentRoles = () => {
  const { loading, error, data } = useQuery(CurrentUserQuery, {});

  const roles = data?.me?.allowedActions;

  const hasRole = (role) => {
    return roles?.length === 0 || roles.includes(role);
  };

  return {
    loading,
    hasRole,
    error,
    roles,
  };
};

export default useCurrentRoles;
