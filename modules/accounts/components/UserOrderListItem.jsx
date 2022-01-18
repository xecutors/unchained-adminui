const UserOrderListItem = ({ order }) => {
  return (
    <tr key={order.email}>
      <td className="px-6 py-4 whitespace-nowrap">{order.ordered}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.orderNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.total.amount}</td>
      <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
    </tr>
  );
};

export default UserOrderListItem;
