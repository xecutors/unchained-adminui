import { useQuery, gql } from '@apollo/client';
import {
  IValidateResetPasswordTokenQuery,
  IValidateResetPasswordTokenQueryVariables,
} from '../../../gql/types';

const VALIDATE_RESET_PASSWORD_TOKEN_QUERY = gql`
  query ValidateResetPasswordToken($token: String!) {
    validateResetPasswordToken(token: $token)
  }
`;

const useValidateResetPasswordToken = ({ token }) => {
  const { data, loading, error, previousData } = useQuery<
    IValidateResetPasswordTokenQuery,
    IValidateResetPasswordTokenQueryVariables
  >(VALIDATE_RESET_PASSWORD_TOKEN_QUERY, {
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
      previousData?.validateResetPasswordToken ||
      data?.validateResetPasswordToken,
  };
};

export default useValidateResetPasswordToken;
