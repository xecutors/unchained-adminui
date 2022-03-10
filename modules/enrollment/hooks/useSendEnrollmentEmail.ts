import { useMutation, gql } from '@apollo/client';

const SendEnrollmentEmailMutation = gql`
  mutation sendEnrollmentEmail($enrollmentId: ID!) {
    sendEnrollmentEmail(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;

const useSendEnrollmentEmail = () => {
  const [sendEnrollmentEmailMutation] = useMutation(
    SendEnrollmentEmailMutation,
  );

  const sendEnrollmentEmail = async ({ enrollmentId }) => {
    return sendEnrollmentEmailMutation({
      variables: { enrollmentId },
    });
  };

  return {
    sendEnrollmentEmail,
  };
};

export default useSendEnrollmentEmail;
