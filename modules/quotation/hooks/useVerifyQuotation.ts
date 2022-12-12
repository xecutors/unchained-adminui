import { useMutation, gql } from '@apollo/client';
import QuotationDetailFragment from '../fragments/QuotationDetailFragment';

const VerifyQuotationMutation = gql`
  mutation VerifyQuotation($quotationId: ID!, $quotationContext: JSON) {
    verifyQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      QuotationDetailFragment
    }
  }
  ${QuotationDetailFragment}
`;

const useVerifyQuotation = () => {
  const [verifyQuotationMutation] = useMutation(VerifyQuotationMutation);

  const VerifyQuotation = async ({
    quotationId = null,
    quotationContext = {},
  }) => {
    return verifyQuotationMutation({
      variables: { quotationId, quotationContext },
    });
  };

  return {
    VerifyQuotation,
  };
};

export default useVerifyQuotation;
