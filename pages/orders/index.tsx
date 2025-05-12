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
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import OrderDetailPage from './OrderDetailPage';

const Orders = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();

  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeCarts = query?.includeCarts === 'true';
  const sort = query?.sort || '';

  const { queryString, orderId, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };

  const sortKeys = convertSortFieldsToQueryFormat(sort);
  const { orders, ordersCount, loading, loadMore } = useOrders({
    limit,
    includeCarts,
    queryString: queryString as string,
    offset,
    sort: sortKeys,
  });

  if (orderId) return <OrderDetailPage orderId={orderId} />;

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'orders_list_header',
            defaultMessage: 'Orders',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div className="mt-5 inline-block min-w-full overflow-x-auto">
        <ListHeader totalRecords={ordersCount}>
          <Toggle
            toggleText={formatMessage({
              id: 'show_carts',
              defaultMessage: 'Show carts',
            })}
            toggleKey="includeCarts"
            active={includeCarts}
          />
        </ListHeader>
        {loading ? (
          <Loading />
        ) : (
          <OrderList loading={loading} orders={orders} showUser sortable />
        )}
        <Pagination data={orders} total={ordersCount} onLoadMore={loadMore} />
      </div>
    </>
  );
};

export default Orders;
