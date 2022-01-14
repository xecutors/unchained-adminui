import Link from 'next/link';
import { useIntl } from 'react-intl';

const CountryListItem = ({ country, onRemove }) => {
  const { locale } = useIntl();
  return (
    <tr>
      <td className="flex px-6 py-4 whitespace-nowrap">
        {country?.flagEmoji}
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

      <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/country/${country._id}`}>
          <a className="flex text-indigo-600 hover:text-indigo-900">
            <svg
              className=" mt-2 mr-2 h-5 w-5 text-indigo-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </a>
        </Link>

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
