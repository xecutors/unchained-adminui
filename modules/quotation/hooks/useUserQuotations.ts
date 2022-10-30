import { useQuery, gql } from '@apollo/client';
import QuotationFragment from '../fragments/QuotationFragment';

export const UserQuotationsQuery = gql`
  query UserQuotations($userId: ID!, $queryString: String) {
    user(userId: $userId) {
      _id
      quotations(queryString: $queryString) {
        ...QuotationFragment
      }
    }
  }
  ${QuotationFragment}
`;

const useUserQuotations = ({ userId = null, queryString = '' } = {}) => {
  const { data, loading, error } = useQuery(UserQuotationsQuery, {
    skip: !userId,
    variables: { userId, queryString },
  });
  const quotations = data?.user?.quotations || [];

  return {
    quotations,
    loading,
    error,
  };
};

export default useUserQuotations;
