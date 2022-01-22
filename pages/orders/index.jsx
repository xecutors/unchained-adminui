import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import OrderList from '../../modules/order/components/OrderList';
import useOrders from '../../modules/order/hooks/useOrders';

const Orders = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeCarts, setIncludeCarts] = useState(false);
  const [queryString, setQueryString] = useState('');
  const { orders, loadMore, ordersCount } = useOrders({
    limit,
    includeCarts,
    queryString,
  });
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'orders_list_header',
          defaultMessage: 'Orders',
        })}
      />
      <SearchField onInputChange={setQueryString} />
      <OrderList
        orders={orders}
        showUser
        showPagination
        includeCarts={includeCarts}
        onIncludeCartsChange={setIncludeCarts}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        total={ordersCount}
      />
    </>
  );
};

export default Orders;
