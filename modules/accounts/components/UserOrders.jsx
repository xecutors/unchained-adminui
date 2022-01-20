import { useState } from 'react';
import ListPagination from '../../common/components/ListPagination';
import OrderList from '../../order/components/OrderList';

/* import useUserOrders from '../hooks/useUserOrders'; */

const UserOrders = ({ _id: userId }) => {
  const [includeCarts, setIncludeCarts] = useState(false);
  /* const { orders } = useUserOrders({ userId, includeCarts }); */

  const orders = [
    {
      _id: 'K894fcKtYxNLxua7s',
      ordered: 1640261999598,
      orderNumber: 'Q1J62EMV',
      status: 'FULLFILLED',
      total: { amount: 37380, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
    {
      _id: 'mKbmjLz2grSy9tdh4',
      ordered: 1639991568090,
      orderNumber: 'Q2V8K3PV',
      status: 'FULLFILLED',
      total: { amount: 3720, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
    {
      _id: 'CyocKfTDtdKFawXJr',
      ordered: 1639064356417,
      orderNumber: '6L203QK9',
      status: 'FULLFILLED',
      total: { amount: 28265, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
  ];

  return (
    <div className="m-5 flex flex-col">
      <OrderList
        orders={orders}
        includeCarts={includeCarts}
        onIncludeCartsChange={setIncludeCarts}
      />
      <ListPagination
        onLoadMore={() => {}}
        data={orders}
        total={orders?.length}
        onLimitChange={() => {}}
      />
    </div>
  );
};

export default UserOrders;
