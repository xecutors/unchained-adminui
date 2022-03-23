const LogsListItem = ({ log }) => {
  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {log?.created}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {log.user?.name}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {log?.message}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
        {log.level}
      </td>
    </tr>
  );
};

export default LogsListItem;
