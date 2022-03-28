import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import Table from '../../common/components/Table';

const CountryListItem = ({ country, onRemove }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  const currencyISOcode =
    country.defaultCurrency && country.defaultCurrency.isoCode;
  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap px-6 ">
        <div className="flex">
          <div className="items-center pl-2 text-sm text-gray-900">
            {country.isoCode}{' '}
          </div>
          {country.isBase && (
            <Badge
              text={formatMessage({
                id: 'base_country',
                defaultMessage: 'Base',
              })}
              className="ml-2 text-sm"
              square
            />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6 ">
        <div className="text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'region' }).of(
            country.isoCode,
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6 ">
        <div className="text-sm text-gray-900">
          {currencyISOcode}

          {/* &&
            `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
              currencyISOcode,
            )}  (${currencyISOcode})`} */}
        </div>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap px-6 ">
        <Badge
          text={STATUS[country.isActive]}
          color={country.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap px-6 ">
        <div className="flex items-center">
          <Link href={`/country/${country._id}`}>
            <a className="flex border-white text-indigo-600 hover:text-indigo-900">
              <svg
                className="mr-2 h-5 w-5 text-indigo-500"
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
          <DeleteButton
            className="ml-1 mr-1 "
            onClick={async () => {
              await onRemove(country._id);
            }}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default CountryListItem;
