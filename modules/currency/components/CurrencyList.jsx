import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CurrencyListItem from './CurrencyListItem';

const CurrencyList = ({ currencies, onRemoveCurrency }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {currencies?.map((currency) => (
        <Table.Row key={currency._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            &nbsp;
          </Table.Cell>
        </Table.Row>
      ))}

      {currencies?.map((currency) => (
        <CurrencyListItem
          key={`${currency?._id}-body`}
          currency={currency}
          onRemove={onRemoveCurrency}
        />
      ))}
    </Table>
  );
};

export default CurrencyList;
