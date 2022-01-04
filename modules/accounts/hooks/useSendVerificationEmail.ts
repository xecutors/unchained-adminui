import { useMutation, gql } from '@apollo/client';


const SendVerificationEmailMutation = gql`
   mutation SendVerificationEmail($email: String) {
        sendVerificationEmail(email: $email) {
          success
        }
      }
`;

const useSendVerificationEmail = () => {
  const [sendVerificationEmailMutation] = useMutation(SendVerificationEmailMutation);

  const sendVerificationEmail = async ({ email }) => {

    return sendVerificationEmailMutation({
      variables: {email},
    });
  };

  return {
    sendVerificationEmail,
  };
};

export default useSendVerificationEmail;
