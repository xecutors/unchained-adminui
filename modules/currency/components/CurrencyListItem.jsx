import Link from 'next/link';
import { useIntl } from 'react-intl';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Table from '../../common/components/Table';
import { normalizeCurrencyISOCode } from '../../common/utils/utils';

const CurrencyListItem = ({ currency, onRemove, enableEdit, enableDelete }) => {
  const { locale, formatMessage } = useIntl();

  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };

  return (
    <Table.Row className="text-sm">
      <Table.Cell>{currency.isoCode}</Table.Cell>

      <Table.Cell>
        {normalizeCurrencyISOCode(locale, currency?.isoCode, false)}
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={STATUS[currency.isActive]}
          color={currency.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>
      {enableEdit ||
        (enableDelete && (
          <Table.Cell>
            <div className="flex items-center">
              {enableEdit && (
                <Link href={`/currency/${currency?._id}`}>
                  <a>
                    <EditIcon />
                  </a>
                </Link>
              )}
              {enableDelete && (
                <DeleteButton
                  className="ml-1 mr-1"
                  onClick={() => onRemove(currency?._id)}
                />
              )}
            </div>
          </Table.Cell>
        ))}
    </Table.Row>
  );
};

export default CurrencyListItem;
