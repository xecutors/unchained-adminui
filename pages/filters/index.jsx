import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import useFilters from '../../modules/filter/hooks/useFilters';
import FilterList from '../../modules/filter/components/FilterList';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveFilter from '../../modules/filter/hooks/useRemoveFilter';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import { getSortKeys } from '../../modules/common/utils/utils';

const FiltersListView = () => {
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const sort = query?.sort || '';
  const { hasRole } = useAuth();
  const includeInactive = query?.includeInactive === 'true';
  const { setModal } = useModal();
  const { removeFilter } = useRemoveFilter();

  const { queryString, ...restQuery } = query;

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...restQuery,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...restQuery,
        },
      });
  };

  const sortKeys = getSortKeys(sort);

  const { filters, filtersCount, loading } = useFilters({
    queryString,
    limit,
    includeInactive,
    offset,
    sort: sortKeys,
  });

  const { formatMessage } = useIntl();

  const onRemoveFilter = async (filterId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this filter? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeFilter({ filterId });
          toast.success(
            formatMessage({
              id: 'filter_deleted',
              defaultMessage: 'Filter deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
    );
  };

  const sortFields = {
    status: formatMessage({
      id: 'isActive',
      defaultMessage: 'Active',
    }),
    created: formatMessage({
      id: 'date_created',
      defaultMessage: 'Date Created',
    }),
    updated: formatMessage({
      id: 'date_updated',
      defaultMessage: 'Date Updated',
    }),
  };

  return (
    <>
      <BreadCrumbs />
      <div className="w-full py-5">
        <PageHeader
          headerText={formatMessage({
            id: 'filters_list_header',
            defaultMessage: 'Filters',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>

      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole(ACTION_ROLES.filters.create) && '/filters/new'}
          sortFields={sortFields}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
            toggleKey="includeInactive"
          />
        </ListHeader>

        {loading ? (
          <Loading />
        ) : (
          <FilterList filters={filters} onRemoveFilter={onRemoveFilter} />
        )}
        <Pagination data={filters} total={filtersCount} />
      </div>
    </>
  );
};

export default FiltersListView;
