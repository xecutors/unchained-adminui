import { gql, useQuery } from '@apollo/client';
import {
  ICurrentUserRoleQuery,
  ICurrentUserRoleQueryVariables,
} from '../../../gql/types';

const UserRolesQuery = gql`
  query CurrentUserRole {
    me {
      _id
      allowedActions
    }
  }
`;

const useCurrentRoles = (params?: ICurrentUserRoleQueryVariables) => {
  const { loading, error, data } = useQuery<
    ICurrentUserRoleQuery,
    ICurrentUserRoleQueryVariables
  >(UserRolesQuery, {});

  const roles = data?.me?.allowedActions;

  const hasRole = (role) => {
    if (role === 'UNRESTRICTED') return true;
    if (roles === undefined) return false;
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
