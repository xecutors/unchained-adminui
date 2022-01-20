import { format } from 'date-fns';
import Badge from '../../common/components/Badge';

const PROVIDER_TYPE_CLASSES = {
  OPEN: 'purple',
  PENDING: 'blue',
  CONFIRMED: 'lime',
  FULLFILLED: 'green',
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
        <Badge
          text={order?.status}
          color={PROVIDER_TYPE_CLASSES[order.status]}
          square
        />
      </td>
    </tr>
  );
};
   
export default UserOrderListItem;
