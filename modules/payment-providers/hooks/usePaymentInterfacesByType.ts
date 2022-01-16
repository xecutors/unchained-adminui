import { useQuery, gql } from '@apollo/client';

export const PaymentInterfacesQuery = gql`
  query PaymentInterfaces($providerType: PaymentProviderType!) {
    paymentInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

const usePaymentInterfacesByType = ({ type = null } = {}) => {
  const { data, loading, error } = useQuery(PaymentInterfacesQuery, {
    variables: { providerType: type },
  });

  const paymentInterfaces = data?.paymentInterfaces || [];

  return {
    paymentInterfaces,
    loading,
    error,
  };
};

export default usePaymentInterfacesByType;
