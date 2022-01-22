import { useState } from 'react';
import OrderList from '../../order/components/OrderList';

import useUserOrders from '../../order/hooks/useUserOrders';

const UserOrders = ({ _id: userId }) => {
  const [includeCarts, setIncludeCarts] = useState(false);
  const { orders } = useUserOrders({ userId, includeCarts });

  return (
    <OrderList
      orders={orders}
      includeCarts={includeCarts}
      onIncludeCartsChange={setIncludeCarts}
    />
  );
};

export default UserOrders;
