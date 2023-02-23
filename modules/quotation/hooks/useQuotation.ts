import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import QuotationDetailFragment from '../fragments/QuotationDetailFragment';

export const GetQuotationsQuery = (inlineFragment = '') => gql`
  query Quotation($quotationId: ID!) {
    quotation(quotationId: $quotationId) {
      _id
      ...QuotationDetailFragment
      ${inlineFragment}
    }
    quotationsCount
  }
  ${QuotationDetailFragment}
`;

const useQuotation = ({ quotationId }) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetQuotationsQuery(customProperties?.Quotation),
    {
      skip: !quotationId,
      variables: { quotationId },
    },
  );

  return {
    quotation: data?.quotation,

    loading,
    error,
  };
};

export default useQuotation;
