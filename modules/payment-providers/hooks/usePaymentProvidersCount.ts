import { useQuery, gql } from '@apollo/client';

export const PaymentProvidersCountQuery = gql`
  query PaymentProvidersCount($type: PaymentProviderType) {
    paymentProvidersCount(type: $type)
  }
`;

const usePaymentProvidersCount = ({ type = '' } = {}) => {
  const { data, loading, error }: any = useQuery(PaymentProvidersCountQuery, {
    variables: { type },
  });

  return {
    paymentProvidersCount: data?.paymentProvidersCount,
    loading,
    error,
  };
};

export default usePaymentProvidersCount;
