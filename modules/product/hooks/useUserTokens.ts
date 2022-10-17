import { useQuery, gql } from '@apollo/client';
import ProductBriefFragment from '../fragments/ProductBriefFragment';
import TokenFragment from '../fragments/TokenFragment';

export const UserTokensQuery = gql`
  query UserTokens($userId: ID!) {
    user(userId: $userId) {
      _id
      tokens {
        ...TokenFragment
        product {
          ...ProductBriefFragment
          simulatedPrice {
            _id
            amount
            currency
          }
        }
      }
    }
  }
  ${TokenFragment}
  ${ProductBriefFragment}
`;

const useUserTokens = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(UserTokensQuery, {
    variables: { userId },
  });
  const tokens = data?.user?.tokens || [];

  return {
    tokens,
    loading,
    error,
  };
};

export default useUserTokens;
