const UserLogListItem = ({ log }) => {
  return (
    <tr key={log._id}>
      <td className="px-6 py-4 whitespace-nowrap">{log.created}</td>
      <td className="px-6 py-4 whitespace-nowrap">{log.level}</td>
      <td className="px-6 py-4 whitespace-nowrap">{log.message}</td>
      <td className="px-6 py-4 whitespace-nowrap">{log.context}</td>
    </tr>
  );
};

export default UserLogListItem;
