import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import useFilters from '../../modules/filter/hooks/useFilters';
import FilterList from '../../modules/filters/FilterList';

const index = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);

  const { filters, filtersCount, loadMore } = useFilters({
    limit,
    includeInactive,
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
      />{' '}
      <FilterList
        onLimitChange={setLimit}
        onIncludeInactiveChange={setIncludeInactive}
        onLoadMore={loadMore}
        includeInactive={includeInactive}
        total={filtersCount}
        filters={filters}
      />
    </>
  );
};

export default index;
