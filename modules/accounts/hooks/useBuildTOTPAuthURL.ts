import { useMutation, gql } from '@apollo/client';
import {
  IBuildSecretTotpAuthUrlMutation,
  IBuildSecretTotpAuthUrlMutationVariables,
} from '../../../gql/types';

const BuildSecretTOTPAuthURLMutation = gql`
  mutation BuildSecretTOTPAuthURL {
    buildSecretTOTPAuthURL
  }
`;

const useBuildTOTPAuthURL = () => {
  const [buildSecretTOTPAuthURLMutation] = useMutation<
    IBuildSecretTotpAuthUrlMutation,
    IBuildSecretTotpAuthUrlMutationVariables
  >(BuildSecretTOTPAuthURLMutation);

  const buildTOTPAuthURL = async () => {
    const { data } = await buildSecretTOTPAuthURLMutation();
    return data?.buildSecretTOTPAuthURL;
  };

  return {
    buildTOTPAuthURL,
  };
};

export default useBuildTOTPAuthURL;
