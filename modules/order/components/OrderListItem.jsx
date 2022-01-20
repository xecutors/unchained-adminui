import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const ORDER_STATUSES = {
  OPEN: 'purple',
  PENDING: 'blue',
  CONFIRMED: 'lime',
  FULLFILLED: 'green',
};

const formatCurrency = ({ amount, currency }) => {
  return `${currency} ${amount}`;
};
const OrderListItem = ({ order, showUser }) => {
  const { formatMessage } = useIntl();
  return (
    <tr key={order._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/orders/${order._id}`}>
            <a className="text-blue-600">
              {order?.orderNumber || (
                <>
                  {order._id}{' '}
                  <Badge
                    color="yellow"
                    text={formatMessage({ id: 'cart', defaultMessage: 'Cart' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.ordered ? format(new Date(order.ordered), 'Pp') : 'n/a'}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {formatCurrency(order.total)}
        </div>
      </td>
      {showUser && order.user && (
        <td className="px-6 py-4 whitespace-nowrap">
          <Link href={`/order/${order.user._id}`}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>{' '}
              {order.user?.name}
            </a>
          </Link>
        </td>
      )}

      <td className="whitespace-nowrap">
        <Badge
          text={order?.status}
          color={ORDER_STATUSES[order.status]}
          square
        />
      </td>
    </tr>
  );
};

export default OrderListItem;
