import { useQuery, gql } from '@apollo/client';
import {
  IPaymentProvidersQuery,
  IPaymentProvidersQueryVariables,
} from '../../../gql/types';
import PaymentProviderFragment from '../fragments/PaymentProviderFragment';

const PaymentProvidersQuery = gql`
  query PaymentProviders($type: PaymentProviderType) {
    paymentProviders(type: $type) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragment}
`;

const usePaymentProviders = ({
  type = null,
}: IPaymentProvidersQueryVariables = {}) => {
  const { data, loading, error }: any = useQuery<
    IPaymentProvidersQuery,
    IPaymentProvidersQueryVariables
  >(PaymentProvidersQuery, {
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
