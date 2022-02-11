import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import FilterDetail from '../../modules/filter/components/FilterDetail';
import useFilters from '../../modules/filter/hooks/useFilters';
import useFilter from '../../modules/filter/hooks/useFilter';

const FilterDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  //   const { filters, loading } = useFilters();
  const { filter, loading } = useFilter({ filterId: slug });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'filter_detail',
          defaultMessage: 'Filter Detail',
        })}
      />
      {loading ? <Loading /> : <FilterDetail filter={filter} />}
    </div>
  );
};

export default FilterDetailPage;
