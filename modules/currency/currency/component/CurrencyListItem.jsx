import Link from 'next/link';

const CurrencyListItem = ({ currency, onRemove }) => {
  const onRemoveCurrency = (id) => {
    onRemove(id);
  };
  return (
    <tr>
      <td className="flex px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {currency.isoCode}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {currency.isActive && 'Active'}
        </span>
      </td>

      <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/currency/edit/${currency?._id}`}>
          <a className="mml-1 mr-1 text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </Link>
        <a
          className=" ml-1 mr-1 text-red-600 hover:text-red-900"
          onClick={() => onRemoveCurrency(currency?._id)}
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default CurrencyListItem;
