import Link from 'next/link';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import Table from '../../common/components/Table';

const FILTER_TYPES = {
  SWITCH: 'sky',
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
    <Table.Row className="group">
      <Table.Cell>
        <Link
          href={`/filters?filterId=${filter._id}`}
          className="flex items-center text-sm text-slate-900 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-100"
        >
          {filter?.texts &&
            (filter?.texts.title || (
              <>
                {filter._id}{' '}
                <Badge
                  color="blue"
                  text={formatMessage({
                    id: 'name',
                    defaultMessage: 'Name',
                  })}
                />
              </>
            ))}
        </Link>
      </Table.Cell>

      <Table.Cell>
        <Link href={`/filters?filterId=${filter._id}`} className="block">
          <Badge
            text={filter.type?.split('_')?.join(' ')}
            color={FILTER_TYPES[filter.type]}
            square
          />
        </Link>
      </Table.Cell>

      <Table.Cell>
        <Link href={`/filters?filterId=${filter._id}`} className="block">
          <Badge
            text={STATUS[filter.isActive]}
            color={filter.isActive ? 'emerald' : 'amber'}
            square
          />
        </Link>
      </Table.Cell>

      <Table.Cell>
        <Link href={`/filters?filterId=${filter._id}`} className="block">
          {filter.options?.length}
        </Link>
      </Table.Cell>
      {hasRole('removeFilter') && (
        <Table.Cell>
          <div className="flex items-center md:justify-center">
            <DeleteButton
              className="px-0"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
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
