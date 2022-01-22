import { gql } from '@apollo/client';

const OrderFragment = gql`
  fragment OrderFragment on Order {
    _id
    status
    created
    updated
    ordered
    orderNumber
    confirmed
    fullfilled
    contact {
      telNumber
      emailAddress
    }
    total {
      _id
      isTaxable
      isNetPrice
      amount
      currency
    }
  }
`;

export default OrderFragment;
