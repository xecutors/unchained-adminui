import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import OrderList from '../../modules/order/components/OrderList';
import useOrders from '../../modules/order/hooks/useOrders';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import SearchWithTags from '../../modules/common/components/SearchWithTags';
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
  const { orders, ordersCount, loading, loadMore, hasMore } = useOrders({
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
      <PageHeader
        headerText={formatMessage(
          (ordersCount ?? 0) === 1
            ? { id: 'order_count_header_singular', defaultMessage: '1 Order' }
            : { id: 'orders_count_header', defaultMessage: '{count} Orders' },
          { count: ordersCount ?? 0 },
        )}
      />
      <div className="mt-5 inline-block min-w-full overflow-x-auto px-1 pb-5">
        <ListHeader>
          <Toggle
            toggleText={formatMessage({
              id: 'show_carts',
              defaultMessage: 'Show carts',
            })}
            toggleKey="includeCarts"
            active={includeCarts}
          />
        </ListHeader>

        <SearchWithTags
          onSearchChange={setQueryString}
          defaultSearchValue={queryString}
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && orders?.length === 0 ? (
              <Loading />
            ) : (
              <OrderList
                loading={loading && orders?.length > 0}
                orders={orders}
                showUser
                sortable
              />
            )}
          </InfiniteScroll>
        </SearchWithTags>
      </div>
    </>
  );
};

export default Orders;
