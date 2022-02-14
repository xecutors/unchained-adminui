import { useState } from 'react';
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

const index = () => {
  const [filter, setFilter] = useState({});
  const { query } = useRouter();

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

  const { workQueue, loading, activeWorkTypes } = useWorkQueue({
    limit,
    offset,
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
        <Pagination data={workQueue} total={(workQueue || []).length} />
      </div>
    </>
  );
};

export default index;
