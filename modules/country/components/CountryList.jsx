import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CountryListItem from './CountryListItem';

const CountryList = ({ countries, onRemoveCountry }) => {
  const { formatMessage } = useIntl();
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

          <Table.Cell>
            <span className="sr-only">
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </span>
          </Table.Cell>
        </Table.Row>
      ))}

      {countries?.map((country) => (
        <CountryListItem
          key={`${country?._id}-body`}
          country={country}
          onRemove={onRemoveCountry}
        />
      ))}
    </Table>
  );
};

export default CountryList;
