import { useMutation, gql } from '@apollo/client';

const MarkPaymentCredentialPreferredMutation = gql`
  mutation MarkPaymentCredentialsPreferred($paymentCredentialsId: ID!) {
    markPaymentCredentialsPreferred(
      paymentCredentialsId: $paymentCredentialsId
    ) {
      _id
      meta
      token
      isValid
      isPreferred
    }
  }
`;

const useMarkPaymentCredentialPreferred = () => {
  const [markPaymentCredentialPreferredMutation] = useMutation(
    MarkPaymentCredentialPreferredMutation,
  );

  const markPaymentCredentialPreferred = async ({ paymentCredentialsId }) => {
    return markPaymentCredentialPreferredMutation({
      variables: {
        paymentCredentialsId,
      },
    });
  };

  return {
    markPaymentCredentialPreferred,
  };
};

export default useMarkPaymentCredentialPreferred;
