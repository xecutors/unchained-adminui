import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import FilterListItem from './FilterListItem';

const FilterList = ({ filters }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {filters?.map((filter) => (
        <Table.Row key={filter._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'name',
              defaultMessage: 'Key(Name)',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'options',
              defaultMessage: 'Options',
            })}
          </Table.Cell>
        </Table.Row>
      ))}
      {filters?.map((filter) => (
        <FilterListItem key={`${filter?._id}111`} filter={filter} />
      ))}
    </Table>
  );
};

export default FilterList;
