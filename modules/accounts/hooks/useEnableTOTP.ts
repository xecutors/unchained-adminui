import { useMutation, gql } from '@apollo/client';
import UserFragment from '../fragment/UserFragment';
import useBuildTOTPAuthURL from './useBuildTOTPAuthURL';

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
  const { buildTOTPAuthURL } = useBuildTOTPAuthURL();
  const enableTOTP = async ({ code }) => {
    const { data } = await buildTOTPAuthURL();
    return enableTOTPMutation({
      variables: {
        code,
        secretBase32: data?.buildSecretTOTPAuthURL,
      },
    });
  };

  return {
    enableTOTP,
  };
};

export default useEnableTOTP;
