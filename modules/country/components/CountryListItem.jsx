import Link from 'next/link';
import { useIntl } from 'react-intl';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Table from '../../common/components/Table';

import {
  normalizeCountryISOCode,
  normalizeCurrencyISOCode,
} from '../../common/utils/utils';

const CountryListItem = ({ country, onRemove, enableEdit, enableDelete }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  const currencyISOcode =
    country.defaultCurrency && country.defaultCurrency.isoCode;
  return (
    <Table.Row className="text-sm">
      <Table.Cell className="whitespace-nowrap">
        <div>
          {country.isoCode}

          {country.isBase && (
            <Badge
              text={formatMessage({
                id: 'base_country',
                defaultMessage: 'Base',
              })}
              className="ml-2 "
              square
            />
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        {normalizeCountryISOCode(locale, country?.isoCode, false)}
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap">
        {currencyISOcode
          ? normalizeCurrencyISOCode(locale, currencyISOcode)
          : null}
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap">
        <Badge
          text={STATUS[country.isActive]}
          color={country.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>
      {enableEdit ||
        (enableDelete && (
          <Table.Cell className="whitespace-nowrap">
            <div className="flex items-center">
              {enableEdit && (
                <Link href={`/country/${country._id}`}>
                  <a>
                    <EditIcon />
                  </a>
                </Link>
              )}
              {enableEdit && (
                <DeleteButton
                  className="ml-1 mr-1 "
                  onClick={async () => {
                    await onRemove(country._id);
                  }}
                />
              )}
            </div>
          </Table.Cell>
        ))}
    </Table.Row>
  );
};

export default CountryListItem;
