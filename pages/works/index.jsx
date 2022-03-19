import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkFilter from '../../modules/work/components/WorkFilter';
import WorkList from '../../modules/work/components/WorkList';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const WorkQueueView = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();

  const filter = {
    created: {
      start: query?.start,
      end: query?.end,
    },
    status: query?.status?.split(','),
    selectTypes: query?.types?.split(','),
  };

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

  const { workQueue, loadMore, loading, activeWorkTypes } = useWorkQueue({
    limit,
    offset,
    ...filter,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'work_queue_header',
          defaultMessage: 'Work queue',
        })}
      />
      <WorkFilter workTypes={activeWorkTypes} />
      <div className="min-w-full overflow-hidden">
        <ListHeader addPath="/works/management" />

        {loading ? <Loading /> : <WorkList workQueue={workQueue} />}
        <Pagination data={workQueue} onLoadMore={loadMore} />
      </div>
    </>
  );
};

export default WorkQueueView;
