import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SearchField from '../../common/components/SearchField';
import OrderList from '../../order/components/OrderList';

import useUserOrders from '../../order/hooks/useUserOrders';

const UserOrders = ({ _id: userId }) => {
  const { query, push } = useRouter();
  const { queryString, ...rest } = query;
  const [includeCarts, setIncludeCarts] = useState(false);

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = rest;
    if (searchString)
      push({
        query: {
          ...withoutSkip,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...rest,
        },
      });
  };

  const { orders } = useUserOrders({ userId, includeCarts, queryString });

  return (
    <div className="space-y-4 mt-4">
      <SearchField defaultValue={queryString} onInputChange={setQueryString} />
      <OrderList
        orders={orders}
        includeCarts={includeCarts}
        onIncludeCartsChange={setIncludeCarts}
        showUser={false}
      />
    </div>
  );
};

export default UserOrders;
