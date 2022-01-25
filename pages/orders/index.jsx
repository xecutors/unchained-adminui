import { useState } from 'react';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
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
        <ListHeader addPath="/order/new">
          <div className="flex items-center h-5">
            <input
              id="include-carts"
              aria-describedby="include-carts"
              name="include-carts"
              type="checkbox"
              checked={includeCarts}
              onChange={() => setIncludeCarts(!includeCarts)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label
              htmlFor="include-carts"
              className="ml-3 font-medium text-gray-700"
            >
              {formatMessage({
                id: 'show_carts',
                defaultMessage: 'Show carts',
              })}
            </label>
          </div>
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
