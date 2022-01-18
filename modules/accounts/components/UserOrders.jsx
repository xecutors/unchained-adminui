import { useIntl } from 'react-intl';
import ListPagination from '../../common/components/ListPagination';
import UserOrderListItem from './UserOrderListItem';
/* import useUserOrders from '../hooks/useUserOrders'; */

const UserOrders = ({ _id: userId }) => {
  /* const { orders } = useUserOrders({ userId }); */
  const { formatMessage } = useIntl();

  const orders = [
    {
      _id: 'K894fcKtYxNLxua7s',
      ordered: 1640261999598,
      orderNumber: 'Q1J62EMV',
      status: 'FULLFILLED',
      total: { amount: 37380, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
    {
      _id: 'mKbmjLz2grSy9tdh4',
      ordered: 1639991568090,
      orderNumber: 'Q2V8K3PV',
      status: 'FULLFILLED',
      total: { amount: 3720, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
    {
      _id: 'CyocKfTDtdKFawXJr',
      ordered: 1639064356417,
      orderNumber: '6L203QK9',
      status: 'FULLFILLED',
      total: { amount: 28265, currency: 'CHF', __typename: 'Price' },
      __typename: 'Order',
    },
  ];

  return (
    <div className="m-5 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'order_date',
                      defaultMessage: 'Order date',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'order_number',
                      defaultMessage: 'Order number',
                    })}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    {formatMessage({
                      id: 'total',
                      defaultMessage: 'Total',
                    })}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    {formatMessage({
                      id: 'status',
                      defaultMessage: 'Status',
                    })}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders?.map((order) => (
                  <UserOrderListItem key={order?._id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ListPagination
        onLoadMore={() => {}}
        data={orders}
        total={orders?.length}
        onLimitChange={() => {}}
      />
    </div>
  );
};

export default UserOrders;
