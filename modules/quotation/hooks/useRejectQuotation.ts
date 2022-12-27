import { useMutation, gql } from '@apollo/client';
import QuotationDetailFragment from '../fragments/QuotationDetailFragment';

const RejectQuotationMutation = gql`
  mutation RejectQuotation($quotationId: ID!, $quotationContext: JSON) {
    rejectQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      ...QuotationDetailFragment
    }
  }
  ${QuotationDetailFragment}
`;

const useRejectQuotation = () => {
  const [rejectQuotationMutation] = useMutation(RejectQuotationMutation);

  const rejectQuotation = async ({
    quotationId = null,
    quotationContext = {},
  }) => {
    return rejectQuotationMutation({
      variables: { quotationId, quotationContext },
    });
  };

  return {
    rejectQuotation,
  };
};

export default useRejectQuotation;
