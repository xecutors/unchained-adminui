const UserLogListItem = ({ log }) => {
  return (
    <tr key={log._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {log.created}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {log.level}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {log.message}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {log.context}
        </div>
      </td>
    </tr>
  );
};

export default UserLogListItem;
