import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import UserFragment from '../fragment/UserFragment';

export const GetUserQuery = (inlineFragment = '') => gql`
  query User($userId: ID) {
    user(userId: $userId) {
      ${inlineFragment}
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useUser = ({ userId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetUserQuery(customProperties?.User),
    {
      skip: !userId,
      variables: { userId },
    },
  );

  const user = data?.user;

  return {
    user,
    shopInfo: data?.shopInfo,
    loading,
    error,
  };
};

export default useUser;
