import { PencilAltIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import Table from '../../common/components/Table';

const CurrencyListItem = ({ currency, onRemove }) => {
  const { locale, formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };

  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm text-gray-900">
          {currency.isoCode}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm text-gray-900">
          {new Intl.DisplayNames([locale], {
            type: 'currency',
            fallback: 'none',
          })?.of(currency.isoCode)}
        </div>
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={STATUS[currency.isActive]}
          color={currency.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center">
          <Link href={`/currency/${currency?._id}`}>
            <a>
              <PencilAltIcon className="mt-1 mr-2 h-5 w-5  text-indigo-500" />
            </a>
          </Link>
          <DeleteButton
            className="ml-1 mr-1"
            onClick={() => onRemove(currency?._id)}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default CurrencyListItem;
