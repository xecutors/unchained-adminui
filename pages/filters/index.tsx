import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import FilterList from '../../modules/filter/components/FilterList';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveFilter from '../../modules/filter/hooks/useRemoveFilter';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import useFiltersCount from '../../modules/filter/hooks/useFiltersCount';

const FiltersListView = () => {
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';
  const { hasRole } = useAuth();
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const { setModal } = useModal();
  const { removeFilter } = useRemoveFilter();

  const { queryString, ...restQuery } = query;
  const { filtersCount } = useFiltersCount({
    queryString: queryString as string,
    includeInactive,
  });

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
  const sortKeys = convertSortFieldsToQueryFormat(sort);
  const { formatMessage } = useIntl();

  const onRemoveFilter = async (filterId) => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
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
          addPath={hasRole('addFilter') && '/filters/new'}
          totalRecords={filtersCount}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
            toggleKey="includeInactive"
            active={includeInactive}
          />
        </ListHeader>

        <LocaleWrapper>
          <FilterList
            onRemoveFilter={onRemoveFilter}
            {...{ queryString, limit, includeInactive, offset, sortKeys }}
          />
        </LocaleWrapper>
      </div>
    </>
  );
};

export default FiltersListView;
