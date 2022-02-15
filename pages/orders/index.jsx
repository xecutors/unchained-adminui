import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import OrderList from '../../modules/order/components/OrderList';
import useOrders from '../../modules/order/hooks/useOrders';

const Orders = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();

  const [queryString, setQueryString] = useState('');

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeCarts = query?.includeCarts === 'true';

  const { orders, ordersCount, loading } = useOrders({
    limit,
    includeCarts,
    queryString,
    offset,
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
      <div className="mt-5 inline-block min-w-full sm:shadow-lg shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader>
          <Toggle
            toggleText={formatMessage({
              id: 'show_carts',
              defaultMessage: 'Show carts',
            })}
            toggleKey="includeCarts"
          />
        </ListHeader>
        {loading ? <Loading /> : <OrderList orders={orders} showUser />}
        <Pagination data={orders} total={ordersCount} />
      </div>
    </>
  );
};

export default Orders;
