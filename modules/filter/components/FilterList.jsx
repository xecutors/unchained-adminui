import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import Table from '../../common/components/Table';
import ACTION_ROLES from '../../common/data/roles';
import useFilters from '../hooks/useFilters';
import FilterListItem from './FilterListItem';

const FilterList = ({
  onRemoveFilter,
  selectedLocale,
  sortKeys,
  queryString,
  limit,
  includeInactive,
  offset,
}) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { filters, filtersCount, loading } = useFilters({
    queryString,
    limit,
    includeInactive,
    offset,
    sort: sortKeys,
    forceLocale: selectedLocale,
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
              {hasRole(ACTION_ROLES.filters.delete) && (
                <Table.Cell>
                  <span className="sr-only">
                    {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
                  </span>
                </Table.Cell>
              )}
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
      )}
      <Pagination data={filters} total={filtersCount} />
    </>
  );
};

export default FilterList;
