import { useMutation, gql } from '@apollo/client';

const VerifyQuotationMutation = gql`
  mutation VerifyQuotation($quotationId: ID!, $quotationContext: JSON) {
    verifyQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      _id
    }
  }
`;

const useVerifyQuotation = () => {
  const [verifyQuotationMutation] = useMutation(VerifyQuotationMutation);

  const VerifyQuotation = async ({
    quotationId = null,
    quotationContext = {},
  }) => {
    return verifyQuotationMutation({
      variables: { quotationId, quotationContext },
      refetchQueries: ['Quotations', 'Quotation'],
    });
  };

  return {
    VerifyQuotation,
  };
};

export default useVerifyQuotation;
