import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import FilterListItem from './FilterListItem';

const FilterList = ({ filters, onRemoveFilter }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {filters?.map((filter) => (
        <Table.Row key={filter._id} header>
          <Table.Cell>
            {formatMessage({
              id: 'filter_key',
              defaultMessage: 'Key',
              description: 'Filter form key',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell>
            {formatMessage({
              id: 'options',
              defaultMessage: 'Options',
            })}
          </Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
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
