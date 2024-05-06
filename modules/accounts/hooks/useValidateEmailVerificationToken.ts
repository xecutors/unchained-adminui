import { useQuery, gql } from '@apollo/client';
import {
  IValidateVerifyEmailTokenQuery,
  IValidateVerifyEmailTokenQueryVariables,
} from '../../../gql/types';

const ValidateVerifyEmailToken = gql`
  query ValidateVerifyEmailToken($token: String!) {
    validateVerifyEmailToken(token: $token)
  }
`;

const useValidateEmailVerificationToken = ({ token }) => {
  const { data, loading, error, previousData } = useQuery<
    IValidateVerifyEmailTokenQuery,
    IValidateVerifyEmailTokenQueryVariables
  >(ValidateVerifyEmailToken, {
    skip: !token,
    variables: {
      token,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    loading,
    error,
    isValid:
      previousData?.validateVerifyEmailToken || data?.validateVerifyEmailToken,
  };
};

export default useValidateEmailVerificationToken;
