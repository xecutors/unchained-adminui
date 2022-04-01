import { useState } from 'react';
import OrderList from '../../order/components/OrderList';

import useUserOrders from '../../order/hooks/useUserOrders';

const UserOrders = ({ _id: userId }) => {
  const [includeCarts, setIncludeCarts] = useState(false);
  const { orders } = useUserOrders({ userId, includeCarts });
  const orderss =[{
    "_id": "24c294a3-5f6e-44c3-8a63-ce4dbb5a9c60",
    "ordered": "6/2/2021",
    "total": {
      "amount": 52,
      "currency": "IDR"
    },
    "status": "CONFIRMED"
  }, {
    "_id": "46ec1c61-1742-405e-b2a2-84f879e37f4c",
    "ordered": "6/18/2021",
    "total": {
      "amount": 66,
      "currency": "IDR"
    },
    "status": "PENDING"
  }, {
    "_id": "266ae0db-de51-4c18-b214-24f12532af1d",
    "ordered": "1/24/2022",
    "total": {
      "amount": 34,
      "currency": "EUR"
    },
    "status": "OPEN"
  }, {
    "_id": "7676a3b3-fb5d-40f3-bc43-10055197bf8e",
    "ordered": "10/5/2021",
    "total": {
      "amount": 23,
      "currency": "CNY"
    },
    "status": "CONFIRMED"
  }, {
    "_id": "a334eb9e-0aa4-4ce7-973d-fecb4f836203",
    "ordered": "3/31/2021",
    "total": {
      "amount": 28,
      "currency": "PHP"
    },
    "status": "PENDING"
  }, {
    "_id": "4ab40833-18f2-45b5-a1fd-500ee64bab74",
    "ordered": "10/24/2021",
    "total": {
      "amount": 19,
      "currency": "CNY"
    },
    "status": "OPEN"
  }, {
    "_id": "c955dff6-f6d5-477a-8da5-8d184dd5584b",
    "ordered": "11/9/2021",
    "total": {
      "amount": 62,
      "currency": "RUB"
    },
    "status": "OPEN"
  }, {
    "_id": "a5be9c9d-a66f-4b83-b5b5-7d0b532325e4",
    "ordered": "6/16/2021",
    "total": {
      "amount": 20,
      "currency": "GTQ"
    },
    "status": "FULLFILLED"
  }, {
    "_id": "e9866585-e027-4b97-8be0-8586e3c5798c",
    "ordered": "2/14/2022",
    "total": {
      "amount": 67,
      "currency": "NIO"
    },
    "status": "CONFIRMED"
  }, {
    "_id": "7a7f10c8-1f38-41bb-b8a0-441ef86b46b1",
    "ordered": "11/21/2021",
    "total": {
      "amount": 34,
      "currency": "EUR"
    },
    "status": "CONFIRMED"
  }]

  return (
    <OrderList
      orders={orderss}
      includeCarts={includeCarts}
      onIncludeCartsChange={setIncludeCarts}
      showUser={false}
    />
  );
};

export default UserOrders;
