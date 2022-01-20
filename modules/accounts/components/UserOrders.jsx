import { useState } from 'react';
import OrderList from '../../order/components/OrderList';

import useUserOrders from '../hooks/useUserOrders';

const UserOrders = ({ _id: userId }) => {
  const [includeCarts, setIncludeCarts] = useState(false);
  const { orders } = useUserOrders({ userId, includeCarts });

  return (
    <div className="m-5 flex flex-col">
      <OrderList
        orders={orders}
        includeCarts={includeCarts}
        onIncludeCartsChange={setIncludeCarts}
      />
    </div>
  );
};

export default UserOrders;
