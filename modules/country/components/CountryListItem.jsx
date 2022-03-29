import { PencilAltIcon } from '@heroicons/react/outline';
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
      <Table.Cell className="whitespace-nowrap">
        <div className="flex">
          <div className="items-center text-sm text-gray-900">
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

      <Table.Cell className="whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Intl.DisplayNames([locale], { type: 'region' }).of(
            country.isoCode,
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {currencyISOcode}

          {/* &&
            `${new Intl.DisplayNames([locale], { type: 'currency' }).of(
              currencyISOcode,
            )}  (${currencyISOcode})`} */}
        </div>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        <Badge
          text={STATUS[country.isActive]}
          color={country.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        <div className="flex items-center">
          <Link href={`/country/${country._id}`}>
            <a className="rounded-full bg-white px-1 py-1 text-sm text-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-2">
              <PencilAltIcon className="h-5 w-5" />
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
