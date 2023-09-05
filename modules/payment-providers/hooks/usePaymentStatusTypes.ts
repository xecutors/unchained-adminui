import { useQuery, gql } from '@apollo/client';
import {
  IOrderPaymentStatusQuery,
  IOrderPaymentStatusQueryVariables,
} from '../../../gql/types';

export const PaymentStatusTypesQuery = gql`
  query OrderPaymentStatus {
    paymentStatusTypes: __type(name: "OrderPaymentStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

const usePaymentStatusTypes = () => {
  const { data, loading, error } = useQuery<
    IOrderPaymentStatusQuery,
    IOrderPaymentStatusQueryVariables
  >(PaymentStatusTypesQuery);

  const paymentStatusTypes = data?.paymentStatusTypes?.options || [];

  return {
    paymentStatusTypes,
    loading,
    error,
  };
};

export default usePaymentStatusTypes;
