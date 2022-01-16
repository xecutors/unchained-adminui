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

const usePaymentProviders = ({ type = null } = {}) => {
  const { data, loading, error }: any = useQuery(PaymentProvidersQuery, {
    variables: { type },
  });

  const paymentProviders = data?.paymentProviders || [];

  return {
    paymentProviders,
    loading,
    error,
  };
};

export default usePaymentProviders;
