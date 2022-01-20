import { useMutation, gql } from '@apollo/client';

const RegisterPaymentCredentialsMutation = gql`
  mutation RegisterPaymentCredentials(
    $paymentContext: JSON!
    $paymentProviderId: ID!
  ) {
    registerPaymentCredentials(
      paymentContext: $paymentContext
      paymentProviderId: $paymentProviderId
    ) {
      _id
      meta
      token
      isValid
      isPreferred
    }
  }
`;

const useRegisterPaymentCredentials = () => {
  const [registerPaymentCredentialsMutation] = useMutation(
    RegisterPaymentCredentialsMutation,
  );

  const registerPaymentCredentials = async ({
    paymentContext = null,
    paymentProviderId = null,
  } = {}) => {
    return registerPaymentCredentialsMutation({
      variables: {
        paymentContext,
        paymentProviderId,
      },
    });
  };

  return {
    registerPaymentCredentials,
  };
};

export default useRegisterPaymentCredentials;
