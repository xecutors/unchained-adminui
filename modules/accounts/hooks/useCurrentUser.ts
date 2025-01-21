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
    impersonator {
      _id
    }

  }
  ${UserFragment}
`;

const useCurrentUser = (params?: ICurrentUserQueryVariables) => {
  const { customProperties, hydrateFragment } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    ICurrentUserQuery,
    ICurrentUserQueryVariables
  >(GetCurrentUserQuery(customProperties?.User), {
    notifyOnNetworkStatusChange: true,
  });

  const currentUser = data?.me || undefined;
  const extendedData = hydrateFragment(customProperties?.User, currentUser);
  const impersonator = data?.impersonator;

  return {
    currentUser: data?.me,
    loading,
    error,
    extendedData,
    impersonator,
  };
};

export default useCurrentUser;
