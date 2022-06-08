import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const EnableTOTPMutation = gql`
  mutation buildSecretTOTPAuthURL($secretBase32: String!, $code: String!) {
    enableTOTP(secretBase32: $secretBase32, code: $code) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useEnableTOTP = () => {
  const [enableTOTPMutation] = useMutation(EnableTOTPMutation);

  const enableTOTP = async () => {
    return enableTOTPMutation();
  };

  return {
    enableTOTP,
  };
};

export default useEnableTOTP;
