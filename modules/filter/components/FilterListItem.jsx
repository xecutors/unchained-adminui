import Link from 'next/link';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';

const FILTER_TYPES = {
  SWITCH: 'blue',
  SINGLE_CHOICE: 'lime',
  MULTI_CHOICE: 'cyan',
};
const FilterListItem = ({ filter, onRemove }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
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

      <Table.Cell>
        <Badge
          text={filter.type?.split('_')?.join(' ')}
          color={FILTER_TYPES[filter.type]}
          square
        />
      </Table.Cell>

      <Table.Cell>
        <Badge
          text={STATUS[filter.isActive]}
          color={filter.isActive ? 'green' : 'red'}
          square
        />
      </Table.Cell>

      <Table.Cell>{filter.options?.length}</Table.Cell>
      {hasRole(ACTION_ROLES.filters.delete) && (
        <Table.Cell>
          <div className="flex items-center justify-center">
            <DeleteButton
              onClick={async () => {
                await onRemove(filter?._id);
              }}
            />
          </div>
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default FilterListItem;
