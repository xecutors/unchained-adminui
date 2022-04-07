import { useQuery, gql } from '@apollo/client';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

export const PaymentProviderQuery = gql`
  query PaymentProvider($paymentProviderId: ID!) {
    paymentProvider(paymentProviderId: $paymentProviderId) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragment}
`;

const usePaymentProvider = ({ paymentProviderId = null } = {}) => {
  const { data, loading, error } = useQuery(PaymentProviderQuery, {
    skip: !paymentProviderId,
    variables: { paymentProviderId },
  });

  return {
    paymentProvider: data?.paymentProvider,
    loading,
    error,
  };
};

export const preFetchPaymentProvider = async (
  apolloClient,
  { paymentProviderId = null },
) => {
  const { data } = await apolloClient.query({
    query: PaymentProviderQuery,
    skip: !paymentProviderId,
    variables: { paymentProviderId },
  });
  return data?.paymentProvider;
};

export default usePaymentProvider;
