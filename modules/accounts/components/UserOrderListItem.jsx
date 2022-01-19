const UserOrderListItem = ({ order }) => {
  return (
    <tr key={order.email}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.ordered}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.orderNumber}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.total.amount}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {order.status}
        </div>
      </td>
    </tr>
  );
};

export default UserOrderListItem;
