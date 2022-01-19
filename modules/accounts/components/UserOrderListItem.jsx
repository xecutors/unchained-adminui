import { format } from 'date-fns';

const PROVIDER_TYPE_CLASSES = {
  OPEN: 'bg-purple-100 text-purple-800',
  PENDING: ' bg-blue-100 text-blue-500',
  CONFIRMED: ' bg-lime-100 text-lime-800',
  FULLFILLED: 'bg-green-100 text-green-800 ',
};

const formatDate = (date) => {
  const newDate = new Date(date).getTime;
  return newDate / 1000;
};
const formatCurrency = ({ amount, currency }) => {
  return `${currency} ${amount}`;
};
const UserOrderListItem = ({ order }) => {
  return (
    <tr key={order.email}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.ordered ? format(new Date(order.ordered), 'Pp') : 'n/a'}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.orderNumber}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {formatCurrency(order.total)}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
            PROVIDER_TYPE_CLASSES[order.status]
          }`}
        >
          {order?.status}
        </div>
      </td>
    </tr>
  );
};

export default UserOrderListItem;
