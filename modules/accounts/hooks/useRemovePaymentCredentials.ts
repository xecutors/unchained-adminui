import { useMutation, gql } from '@apollo/client';

const RemovePaymentCredentialsMutation = gql`
  mutation RemovePaymentCredentials($paymentCredentialsId: ID!) {
    removePaymentCredentials(paymentCredentialsId: $paymentCredentialsId) {
      _id
      meta
      token
      isValid
      isPreferred
    }
  }
`;

const useRemovePaymentCredentials = () => {
  const [removePaymentCredentialsMutation] = useMutation(
    RemovePaymentCredentialsMutation,
  );

  const removePaymentCredentials = async ({ paymentCredentialsId }) => {
    return removePaymentCredentialsMutation({
      variables: {
        paymentCredentialsId,
      },
    });
  };

  return {
    removePaymentCredentials,
  };
};

export default useRemovePaymentCredentials;
