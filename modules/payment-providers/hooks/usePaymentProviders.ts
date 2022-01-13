import { useQuery, gql } from '@apollo/client';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

export const PaymentProvidersQuery = gql`
  query PaymentProviders($type: PaymentProviderType) {
    paymentProviders(type: $type) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragment}
`;

const usePaymentProviders = ({ type = '' } = {}) => {
  const { data, loading, error, fetchMore }: any = useQuery(
    PaymentProvidersQuery,
    {
      variables: { type },
    },
  );

  const paymentProviders = data?.paymentProviders || [];

  const loadMore = () =>
    fetchMore({ variables: { offset: paymentProviders.length } });

  return {
    paymentProviders,
    loading,
    error,
    loadMore,
  };
};

export default usePaymentProviders;
