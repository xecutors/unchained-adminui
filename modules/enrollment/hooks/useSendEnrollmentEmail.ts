import { useMutation, gql } from '@apollo/client';
import {
  ISendEnrollmentEmailMutation,
  ISendEnrollmentEmailMutationVariables,
} from '../../../gql/types';

const SendEnrollmentEmailMutation = gql`
  mutation SendEnrollmentEmail($email: String!) {
    sendEnrollmentEmail(email: $email) {
      success
    }
  }
`;

const useSendEnrollmentEmail = () => {
  const [sendEnrollmentEmailMutation] = useMutation<
    ISendEnrollmentEmailMutation,
    ISendEnrollmentEmailMutationVariables
  >(SendEnrollmentEmailMutation);

  const sendEnrollmentEmail = async ({
    email,
  }: ISendEnrollmentEmailMutationVariables) => {
    return sendEnrollmentEmailMutation({
      variables: { email },
    });
  };

  return {
    sendEnrollmentEmail,
  };
};

export default useSendEnrollmentEmail;
