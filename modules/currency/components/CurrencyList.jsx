import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CurrencyListItem from './CurrencyListItem';

const CurrencyList = ({ currencies, onRemoveCurrency }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {currencies?.map((currency) => (
        <Table.Row key={currency._id} header>
          <Table.Cell>
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>

          <Table.Cell>&nbsp;</Table.Cell>
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
