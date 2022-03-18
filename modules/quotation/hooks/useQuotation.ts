import { useQuery, gql } from '@apollo/client';
import QuotationFragment from '../fragments/QuotationFragment';

export const QuotationsQuery = gql`
  query quotation($quotationId: ID!) {
    quotation(quotationId: $quotationId) {
      _id
      ...QuotationFragment
    }
    quotationsCount
  }
  ${QuotationFragment}
`;

const useQuotation = ({ quotationId }) => {
  const { data, loading, error } = useQuery(QuotationsQuery, {
    skip: !quotationId,
    variables: { quotationId },
  });

  return {
    quotation: data?.quotation,

    loading,
    error,
  };
};

export default useQuotation;
