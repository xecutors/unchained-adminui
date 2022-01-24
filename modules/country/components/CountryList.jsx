import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CountryListItem from './CountryListItem';

const CountryList = ({ countries }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {countries?.map((country) => (
        <Table.Row key={country._id} className="bg-white " header>
          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'default_currency',
              defaultMessage: 'Default currency',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            <span className="sr-only">
              {formatMessage({ id: 'active', defaultMessage: ' ' })}
            </span>
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            <span className="sr-only">
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </span>
          </Table.Cell>
        </Table.Row>
      ))}

      {countries?.map((country) => (
        <CountryListItem key={`${country?._id}111`} country={country} />
      ))}
    </Table>
  );
};

export default CountryList;
