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
            <a>
              <PencilAltIcon className="mt-1 mr-2 h-5 w-5 text-indigo-500" />
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
