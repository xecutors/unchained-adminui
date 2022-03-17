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
    user {
      _id
      username
      isGuest
      avatar {
        _id
        url
      }
    }
  }
`;

export default OrderFragment;
