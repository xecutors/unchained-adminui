import { useQuery, gql } from '@apollo/client';
import QuotationDetailFragment from '../fragments/QuotationDetailFragment';

export const QuotationsQuery = gql`
  query quotation($quotationId: ID!) {
    quotation(quotationId: $quotationId) {
      _id
      ...QuotationDetailFragment
    }
    quotationsCount
  }
  ${QuotationDetailFragment}
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
