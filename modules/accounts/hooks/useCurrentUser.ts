import { useQuery, gql } from '@apollo/client';
import {
  ICurrentUserQuery,
  ICurrentUserQueryVariables,
} from '../../../gql/types';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import UserFragment from '../fragment/UserFragment';

export const GetCurrentUserQuery = (inlineFragment = '') => gql`
  query CurrentUser {
    me {
      ...UserFragment
      ${inlineFragment}
    }
  }
  ${UserFragment}
`;

const useCurrentUser = (params?: ICurrentUserQueryVariables) => {
  const { customProperties, hydrateFragment } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    ICurrentUserQuery,
    ICurrentUserQueryVariables
  >(GetCurrentUserQuery(customProperties?.User));

  const currentUser = data?.me || null;
  const extendedData = hydrateFragment(customProperties?.User, currentUser);

  return {
    currentUser,
    loading,
    error,
    extendedData,
  };
};

export default useCurrentUser;
