import { useQuery, gql } from '@apollo/client';
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

const useCurrentUser = () => {
  const { customProperties, hydrateFragment } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetCurrentUserQuery(customProperties?.User),
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
    },
  );

  const currentUser = data?.me;
  const extendedData = hydrateFragment(customProperties?.User, currentUser);
  const impersonator = data?.impersonator;

  return {
    currentUser,
    loading,
    error,
    extendedData,
    impersonator,
  };
};

export default useCurrentUser;
