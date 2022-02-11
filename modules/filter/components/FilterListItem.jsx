import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

const FILTER_TYPES = {
  SWITCH: 'blue',
  SINGLE_CHOICE: 'lime',
  MULTI_CHOICE: 'cyan',
};
const FilterListItem = ({ filter }) => {
  const { formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/filters/${filter._id}`}>
            <a className="text-blue-600">
              {filter?.texts.title || (
                <>
                  {filter._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'name', defaultMessage: 'Name' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <Badge text={filter.type} color={FILTER_TYPES[filter.type]} square />
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <Badge
          text={STATUS[filter.isActive]}
          color={filter.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        {filter.options?.length}
      </Table.Cell>
    </Table.Row>
  );
};

export default FilterListItem;
