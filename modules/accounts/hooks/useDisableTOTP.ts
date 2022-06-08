import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';

const DisableTOTPMutation = gql`
  mutation buildSecretTOTPAuthURL($code: String!, $userId: ID) {
    disableTOTP(code: $code, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

const useDisableTOTP = () => {
  const [disableTOTPMutation] = useMutation(DisableTOTPMutation);

  const disableTOTP = async () => {
    return disableTOTPMutation();
  };

  return {
    disableTOTP,
  };
};

export default useDisableTOTP;
