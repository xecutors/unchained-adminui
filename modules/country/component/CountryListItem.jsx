import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const CountryListItem = ({ country, onRemove }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  const currencyISOcode =
    country.defaultCurrency && country.defaultCurrency.isoCode;
  return (
    <tr>
      <td className=" flex px-6 py-4 whitespace-nowrap">
        {country?.flagEmoji}
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {country.isoCode}{' '}
        </div>
        {country.isBase && (
          <Badge
            text={formatMessage({ id: 'base_country', defaultMessage: 'Base' })}
            className="ml-2 text-xs"
          />
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'region' }).of(
            country.isoCode,
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {currencyISOcode &&
            `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
              currencyISOcode,
            )}  (${currencyISOcode})`}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          text={STATUS[country.isActive]}
          color={country.isActive ? 'green' : 'red'}
          square
        />
      </td>

      <td className="px-6 py-4 whitespace-nowrap" />

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
          className="ml-1 mr-1 text-red-600 hover:text-red-900 cursor-pointer"
          onClick={async () => {
            await onRemove(country._id);
          }}
        >
          <svg
            className="m-2 h-5 w-5 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <polyline points="3 6 5 6 21 6" />{' '}
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
            <line x1="10" y1="11" x2="10" y2="17" />{' '}
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </a>
      </td>
    </tr>
  );
};

export default CountryListItem;
