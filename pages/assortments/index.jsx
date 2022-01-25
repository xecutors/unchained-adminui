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

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [includeLeaves, setIncludeLeaves] = useState(false);
  const { assortments, assortmentsCount, loadMore, loading } = useAssortments({
    includeInactive,
    includeLeaves,
    limit,
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

        <AssortmentList
          isLoading={loading}
          onLimitChange={setLimit}
          includeInactive={includeInactive}
          onIncludeInactiveChange={setIncludeInactive}
          onIncludeLeavesChange={setIncludeLeaves}
          includeLeaves={includeLeaves}
          assortments={assortments}
          onLoadMore={loadMore}
          total={assortmentsCount}
        />
        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={assortments}
          total={assortmentsCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default index;
