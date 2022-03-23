import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import FilterListItem from './FilterListItem';

const FilterList = ({ filters, onRemoveFilter }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {filters?.map((filter) => (
        <Table.Row key={filter._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'filter_key',
              defaultMessage: 'Key',
              description: 'Filter form key',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
          </Table.Cell>

          <Table.Cell className="sm:py-1text-gray-500  pr-6 text-left text-xs font-medium uppercase tracking-wider">
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            {formatMessage({
              id: 'options',
              defaultMessage: 'Options',
            })}
          </Table.Cell>
          <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
            &nbsp;
          </Table.Cell>
        </Table.Row>
      ))}
      {filters?.map((filter) => (
        <FilterListItem
          key={`${filter?._id}-body`}
          filter={filter}
          onRemove={onRemoveFilter}
        />
      ))}
    </Table>
  );
};

export default FilterList;
