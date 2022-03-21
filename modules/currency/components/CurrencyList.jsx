import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CurrencyListItem from './CurrencyListItem';

const CurrencyList = ({ currencies, onRemoveCurrency }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {currencies?.map((currency) => (
        <Table.Row key={currency._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
