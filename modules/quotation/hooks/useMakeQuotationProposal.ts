import { useMutation, gql } from '@apollo/client';
import QuotationDetailFragment from '../fragments/QuotationDetailFragment';

const MakeQuotationProposalMutation = gql`
  mutation MakeQuotationProposal($quotationId: ID!, $quotationContext: JSON) {
    makeQuotationProposal(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      ...QuotationDetailFragment
    }
  }
  ${QuotationDetailFragment}
`;

const useMakeQuotationProposal = () => {
  const [makeQuotationProposalMutation] = useMutation(
    MakeQuotationProposalMutation,
  );

  const makeQuotationProposal = async ({
    quotationId = null,
    quotationContext = {},
  }) => {
    return makeQuotationProposalMutation({
      variables: { quotationId, quotationContext },
    });
  };

  return {
    makeQuotationProposal,
  };
};

export default useMakeQuotationProposal;
