import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkList from '../../modules/work/components/WorkList';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const index = () => {
  const [limit, setLimit] = useState();
  const { workQueue, loadMore, loading } = useWorkQueue({ limit });
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
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/works/new" />
        <WorkList workQueue={workQueue} />

        <ListPagination
          isLoading={loading}
          data={workQueue}
          onLimitChange={setLimit}
          total={(workQueue || []).length}
          onLoadMore={loadMore}
        />
      </div>
    </>
  );
};

export default index;
