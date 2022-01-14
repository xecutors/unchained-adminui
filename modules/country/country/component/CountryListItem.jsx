import { useIntl } from 'react-intl';

const CountryListItem = ({ country, onRemove }) => {
  const { locale } = useIntl();
  return (
    <tr>
      <td className="flex px-6 py-4 whitespace-nowrap">
        {country.flagEmoji}
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {country.isoCode}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'region' }).of(
            country.isoCode,
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {country.isActive && 'Active'}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{country.isoCode}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {country.isBase && 'Base Country'}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>

        <a
          onClick={async () => {
            await onRemove(country._id);
          }}
          className=" ml-1 mr-1 text-red-600 hover:text-red-900"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default CountryListItem;
