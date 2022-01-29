import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkFilter from '../../modules/work/components/WorkFilter';
import WorkList from '../../modules/work/components/WorkList';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const index = () => {
  const [limit, setLimit] = useState();
  const [filter, setFilter] = useState({});
  const { workQueue, loadMore, loading, activeWorkTypes } = useWorkQueue({
    limit,
    ...filter,
  });
  const { formatMessage } = useIntl();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'work_queue_header',
          defaultMessage: 'Work queue',
        })}
      />
      <WorkFilter
        workTypes={activeWorkTypes}
        onFilter={({ types, dateRange, status }) => {
          setFilter({
            selectTypes: types,
            status,
            created: dateRange,
          });
        }}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/works/management" />

        {loading ? <Loading /> : <WorkList workQueue={workQueue} />}
        <ListPagination
          data={workQueue}
          onLimitChange={setLimit}
          total={(workQueue || []).length}
          onLoadMore={loadMore}
          limit={limit}
        />
      </div>
    </>
  );
};

export default index;
