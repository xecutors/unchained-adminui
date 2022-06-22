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

  const enableTOTP = async ({ secretBase32, code }) => {
    return enableTOTPMutation({
      variables: {
        code,
        secretBase32,
      },
      refetchQueries: ['CurrentUser'],
    });
  };

  return {
    enableTOTP,
  };
};

export default useEnableTOTP;
