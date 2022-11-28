import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const VerifyEmailMutation = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      id
      token
      tokenExpires
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragment}
`;

const useVerifyEmail = () => {
  const [verifyEmailMutation] = useMutation(VerifyEmailMutation);

  const verifyEmail = async ({ token }) => {
    return verifyEmailMutation({
      variables: { token },
    });
  };

  return {
    verifyEmail,
  };
};

export default useVerifyEmail;
