import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const EnableTOTPMutation = gql`
  mutation EnableTOTP($secretBase32: String!, $code: String!) {
    enableTOTP(secretBase32: $secretBase32, code: $code) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useEnableTOTP = () => {
  const [enableTOTPMutation] = useMutation(EnableTOTPMutation);

  const enableTOTP = async ({ otpauthUrl, code }) => {
    let secretBase32;
    try {
      secretBase32 = Object.fromEntries(
        new URLSearchParams(new URL(otpauthUrl).search),
      ).secret;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }

    return enableTOTPMutation({
      variables: {
        code,
        secretBase32,
      },
    });
  };

  return {
    enableTOTP,
  };
};

export default useEnableTOTP;
