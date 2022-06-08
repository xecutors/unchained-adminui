import { useMutation, gql } from '@apollo/client';

const BuildSecretTOTPAuthURLMutation = gql`
  mutation BuildSecretTOTPAuthURL {
    buildSecretTOTPAuthURL
  }
`;

const useBuildTOTPAuthURL = () => {
  const [buildSecretTOTPAuthURLMutation] = useMutation(
    BuildSecretTOTPAuthURLMutation,
  );

  const buildTOTPAuthURL = async () => {
    return buildSecretTOTPAuthURLMutation();
  };

  return {
    buildTOTPAuthURL,
  };
};

export default useBuildTOTPAuthURL;
