import { useIntl } from 'react-intl';
import ListHeader from '../../common/components/ListHeader';
import ListPagination from '../../common/components/ListPagination';
import OrderListItem from './OrderListItem';

const OrderList = ({
  orders,
  showUser,
  includeCarts,
  onIncludeCartsChange,
  onLoadMore,
  showPagination,
  onLimitChange,
  total,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <ListHeader>
            <div className="flex items-center h-5">
              <input
                id="include-carts"
                aria-describedby="include-carts"
                name="include-carts"
                type="checkbox"
                checked={includeCarts}
                onChange={() => onIncludeCartsChange(!includeCarts)}
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'order_number',
                    defaultMessage: 'Order number',
                  })}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'order_date',
                    defaultMessage: 'Order date',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'total',
                    defaultMessage: 'Total',
                  })}
                </th>
                {showUser && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'user',
                      defaultMessage: 'User',
                    })}
                  </th>
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'status',
                    defaultMessage: 'Status',
                  })}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order) => (
                <OrderListItem key={order?._id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPagination && (
        <ListPagination
          onLoadMore={onLoadMore}
          data={orders}
          total={total}
          onLimitChange={onLimitChange}
        />
      )}
    </div>
  );
};

export default OrderList;
