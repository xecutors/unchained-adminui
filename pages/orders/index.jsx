import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import OrderList from '../../modules/order/components/OrderList';
import useOrders from '../../modules/order/hooks/useOrders';

const Orders = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeCarts, setIncludeCarts] = useState(false);
  const [queryString, setQueryString] = useState('');
  const { orders, loadMore, ordersCount, loading } = useOrders({
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
      <div className=" inline-block min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader>
          <Toggle
            toggleText={formatMessage({
              id: 'show_carts',
              defaultMessage: 'Show carts',
            })}
            toggleState={includeCarts}
            onToggle={setIncludeCarts}
          />
        </ListHeader>
        <OrderList
          isLoading={loading}
          orders={orders}
          showUser
          showPagination
          includeCarts={includeCarts}
          onIncludeCartsChange={setIncludeCarts}
          onLimitChange={setLimit}
          onLoadMore={loadMore}
          total={ordersCount}
        />

        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={orders}
          total={ordersCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default Orders;
