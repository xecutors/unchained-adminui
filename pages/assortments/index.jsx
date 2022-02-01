import { useState } from 'react';
import { useIntl } from 'react-intl';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import AssortmentList from '../../modules/assortment/components/AssortmentList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import Loading from '../../modules/common/components/Loading';
import AssortmentFilter from '../../modules/assortment/components/AssortmentFilter';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [includeLeaves, setIncludeLeaves] = useState(false);
  const [filter, setFilter] = useState({});
  const [offset, setOffset] = useState(0);

  const { assortments, assortmentsCount, loadMore, loading } = useAssortments({
    includeInactive,
    includeLeaves,
    limit,
    offset,
    ...filter,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortments_list_header',
          defaultMessage: 'Assortments',
        })}
      />
      <AssortmentFilter
        onFilter={({ onSearch, tag }) => {
          setFilter({
            tag,
            onSearch,
          });
        }}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/assortments/new">
          <Toggle
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
          />
          <Toggle
            toggleState={includeLeaves}
            toggleText={formatMessage({
              id: 'include_leaf',
              defaultMessage: 'Include leafs',
              description: 'Assortment children',
            })}
            onToggle={setIncludeLeaves}
          />
        </ListHeader>
        {loading ? <Loading /> : <AssortmentList assortments={assortments} />}
        <ListPagination
          onLoadMore={loadMore}
          data={assortments}
          limit={limit}
          total={assortmentsCount}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={setOffset}
        />
      </div>
    </>
  );
};

export default index;
