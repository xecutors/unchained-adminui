import { useMutation, gql } from '@apollo/client';

const SendEnrollmentEmailMutation = gql`
  mutation sendEnrollmentEmail($email: String!) {
    sendEnrollmentEmail(email: $email) {
      success
    }
  }
`;

const useSendEnrollmentEmail = () => {
  const [sendEnrollmentEmailMutation] = useMutation(
    SendEnrollmentEmailMutation,
  );

  const sendEnrollmentEmail = async ({ email }) => {
    return sendEnrollmentEmailMutation({
      variables: { email },
    });
  };

  return {
    sendEnrollmentEmail,
  };
};

export default useSendEnrollmentEmail;
