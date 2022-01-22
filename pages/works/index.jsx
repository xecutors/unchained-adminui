import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import WorkList from '../../modules/work/components/WorkList';
import useWorkQueue from '../../modules/work/hooks/useWorkQueue';

const index = () => {
  const [limit, setLimit] = useState();
  const { workQueue, loadMore } = useWorkQueue({ limit });
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
      <WorkList
        workQueue={workQueue}
        onLoadMore={loadMore}
        onLimitChange={setLimit}
      />
    </>
  );
};

export default index;
