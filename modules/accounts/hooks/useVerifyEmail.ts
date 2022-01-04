import { useMutation, gql } from '@apollo/client';


const VerifyEmailMutation = gql`
   mutation VerifyEmail($token: String!) {
        verifyEmail(token: $token) {
          id
          token
          tokenExpires
        }
      }
`;

const useSendVerificationEmail = () => {
  const [verifyEmailMutation] = useMutation(VerifyEmailMutation);

  const verifyEmail = async ({ token }) => {

    return verifyEmailMutation({
      variables: {token},
    });
  };

  return {
    verifyEmail,
  };
};

export default useSendVerificationEmail;
