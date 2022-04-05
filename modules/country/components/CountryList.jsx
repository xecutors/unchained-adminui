import { useIntl } from 'react-intl';
import useCurrentRoles from '../../accounts/hooks/useCurrentRoles';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';
import CountryListItem from './CountryListItem';

const CountryList = ({ countries, onRemoveCountry }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useCurrentRoles();
  return (
    <Table className="min-w-full ">
      {countries?.map((country) => (
        <Table.Row key={country._id} header>
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
            {formatMessage({
              id: 'default_currency',
              defaultMessage: 'Default currency',
            })}
          </Table.Cell>

          <Table.Cell>
            <span className="sr-only">
              {formatMessage({ id: 'active', defaultMessage: 'Active' })}
            </span>
          </Table.Cell>
          {hasRole(ACTION_ROLES.country.update) ||
            (hasRole(ACTION_ROLES.country.delete) && (
              <Table.Cell>
                <span className="sr-only">
                  {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                  {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
                </span>
              </Table.Cell>
            ))}
        </Table.Row>
      ))}

      {countries?.map((country) => (
        <CountryListItem
          key={`${country?._id}-body`}
          country={country}
          onRemove={onRemoveCountry}
          enableEdit={hasRole(ACTION_ROLES.country.update)}
          enableDelete={hasRole(ACTION_ROLES.country.delete)}
        />
      ))}
    </Table>
  );
};

export default CountryList;
