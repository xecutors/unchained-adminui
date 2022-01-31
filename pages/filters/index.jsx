import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import useFilters from '../../modules/filter/hooks/useFilters';
import FilterList from '../../modules/filter/components/FilterList';
import Loading from '../../modules/common/components/Loading';

const index = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [offset, setOffset] = useState(0);
  const onOffsetChange = (value) => {
    setOffset(value);
  };

  const { filters, filtersCount, loadMore, loading } = useFilters({
    limit,
    includeInactive,
    offset,
  });
  const { formatMessage } = useIntl();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'filters_list_header',
          defaultMessage: 'Filters',
        })}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/filters/new">
          <Toggle
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>

        {loading ? <Loading /> : <FilterList filters={filters} />}
        <ListPagination
          onLoadMore={loadMore}
          data={filters}
          total={filtersCount}
          limit={limit}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={onOffsetChange}
        />
      </div>
    </>
  );
};

export default index;
