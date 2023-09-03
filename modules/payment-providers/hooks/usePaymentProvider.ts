import { useQuery, gql } from '@apollo/client';
import {
  IPaymentProviderQuery,
  IPaymentProviderQueryVariables,
} from '../../../gql/types';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

export const GetPaymentProviderQuery = (inlineFragment = '') => gql`
  query PaymentProvider($paymentProviderId: ID!) {
    paymentProvider(paymentProviderId: $paymentProviderId) {
      ...PaymentProviderFragment
      ${inlineFragment}
    }
  }
  ${PaymentProviderFragment}
`;

const usePaymentProvider = ({
  paymentProviderId = null,
}: IPaymentProviderQueryVariables) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery<
    IPaymentProviderQuery,
    IPaymentProviderQueryVariables
  >(GetPaymentProviderQuery(customProperties?.PaymentProvider), {
    skip: !paymentProviderId,
    variables: { paymentProviderId },
  });

  return {
    paymentProvider: data?.paymentProvider,
    loading,
    error,
  };
};

export default usePaymentProvider;
