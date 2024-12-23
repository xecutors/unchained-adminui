import { useQuery, gql } from '@apollo/client';
import { ITokensQuery, ITokensQueryVariables } from '../../../gql/types';
import TokenFragment from '../../product/fragments/TokenFragment';
import ProductBriefFragment from '../../product/fragments/ProductBriefFragment';
import { DefaultLimit } from '../../common/data/miscellaneous';

const TokensQuery = gql`
  query Tokens($limit: Int, $offset: Int) {
    tokens(limit: $limit, offset: $offset) {
      ...TokenFragment
      product {
        ...ProductBriefFragment
        simulatedPrice {
          _id
          amount
          currency
        }
      }
      user {
        _id
        username
        isGuest
        avatar {
          _id
          url
        }
        profile {
          displayName
          address {
            firstName
            lastName
          }
        }
      }
    }
  }
  ${TokenFragment}
  ${ProductBriefFragment}
`;

const useTokens = ({
  limit = DefaultLimit,
  offset = 0,
}: ITokensQueryVariables) => {
  const { data, loading, error } = useQuery<
    ITokensQuery,
    ITokensQueryVariables
  >(TokensQuery, {
    variables: { limit, offset },
  });
  const tokens = data?.tokens || [];

  return {
    tokens,
    loading,
    error,
  };
};

export default useTokens;
