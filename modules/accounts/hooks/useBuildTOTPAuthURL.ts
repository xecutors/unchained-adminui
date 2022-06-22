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
    const { data } = await buildSecretTOTPAuthURLMutation();
    return data?.buildSecretTOTPAuthURL;
  };

  return {
    buildTOTPAuthURL,
  };
};

export default useBuildTOTPAuthURL;
