import { useMutation, gql } from '@apollo/client';
import {
  IForgotPasswordMutation,
  IForgotPasswordMutationVariables,
} from '../../../gql/types';

const ForgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;

const useForgotPassword = () => {
  const [forgotPasswordMutation] = useMutation<
    IForgotPasswordMutation,
    IForgotPasswordMutationVariables
  >(ForgotPasswordMutation);

  const forgotPassword = async ({
    email,
  }: IForgotPasswordMutationVariables) => {
    return forgotPasswordMutation({
      variables: { email },
    });
  };

  return {
    forgotPassword,
  };
};

export default useForgotPassword;
