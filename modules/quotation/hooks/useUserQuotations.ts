import { useQuery, gql } from '@apollo/client';
import QuotationFragment from '../fragments/QuotationFragment';

export const UserQuotationsQuery = gql`
  query UserQuotations($userId: ID!) {
    user(userId: $userId) {
      _id
      quotations {
        ...QuotationFragment
      }
    }
  }
  ${QuotationFragment}
`;

const useUserQuotations = ({ userId = null } = {}) => {
  const { data, loading, error } = useQuery(UserQuotationsQuery, {
    skip: !userId,
    variables: { userId },
  });
  const quotations = data?.user?.quotations || [];

  return {
    quotations,
    loading,
    error,
  };
};

export default useUserQuotations;
