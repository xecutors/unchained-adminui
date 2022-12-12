import { useMutation, gql } from '@apollo/client';

const RejectQuotationMutation = gql`
  mutation RejectQuotation($quotationId: ID!, $quotationContext: JSON) {
    rejectQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      _id
    }
  }
`;

const useRejectQuotation = () => {
  const [rejectQuotationMutation] = useMutation(RejectQuotationMutation);

  const rejectQuotation = async ({
    quotationId = null,
    quotationContext = {},
  }) => {
    return rejectQuotationMutation({
      variables: { quotationId, quotationContext },
      refetchQueries: ['Quotations'],
    });
  };

  return {
    rejectQuotation,
  };
};

export default useRejectQuotation;
