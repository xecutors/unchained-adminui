import { useIntl } from 'react-intl';

import useAuth from '../../Auth/useAuth';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';
import CurrencyListItem from './CurrencyListItem';

const CurrencyList = ({ currencies, onRemoveCurrency }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
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
          {(hasRole(ACTION_ROLES.currencies.view) ||
            hasRole(ACTION_ROLES.currencies.delete)) && (
            <Table.Cell>&nbsp;</Table.Cell>
          )}
        </Table.Row>
      ))}

      {currencies?.map((currency) => (
        <CurrencyListItem
          key={`${currency?._id}-body`}
          currency={currency}
          onRemove={onRemoveCurrency}
          enableDelete={hasRole(ACTION_ROLES.currencies.delete)}
          enableEdit={hasRole(ACTION_ROLES.currencies.view)}
        />
      ))}
    </Table>
  );
};

export default CurrencyList;
