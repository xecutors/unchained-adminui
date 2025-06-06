import { useMutation, gql } from '@apollo/client';
import {
  ISendVerificationEmailMutation,
  ISendVerificationEmailMutationVariables,
} from '../../../gql/types';

const SendVerificationEmailMutation = gql`
  mutation SendVerificationEmail($email: String) {
    sendVerificationEmail(email: $email) {
      success
    }
  }
`;

const useSendVerificationEmail = () => {
  const [sendVerificationEmailMutation] = useMutation<
    ISendVerificationEmailMutation,
    ISendVerificationEmailMutationVariables
  >(SendVerificationEmailMutation);

  const sendVerificationEmail = async ({
    email,
  }: ISendVerificationEmailMutationVariables) => {
    return sendVerificationEmailMutation({
      variables: { email },
    });
  };

  return {
    sendVerificationEmail,
  };
};

export default useSendVerificationEmail;
