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
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import { ISortOptionInput, IWorkStatus, IWorkType } from '../../gql/types';
import WorkDetailPage from './WorkDetailPage';

const WorkQueueView = () => {
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();
  const filter = {
    created: {
      start: query?.start,
      end: query?.end,
    },
    status: (query?.status as string)?.split(',') as IWorkStatus[],
    types: (query?.types as string)?.split(',') as IWorkType[],
  };
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;

  const sort = query?.sort || '';

  const { queryString, workerId, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { workQueue, loadMore, loading, activeWorkTypes, total } = useWorkQueue(
    {
      queryString: queryString as string,
      limit,
      ...filter,
      sort: sortKeys as ISortOptionInput[],
      offset,
    },
  );

  if (workerId) return <WorkDetailPage workerId={workerId} />;
  return (
    <>
      <BreadCrumbs
        depth={3}
        currentPageTitle={formatMessage({
          id: 'work_queue_header',
          defaultMessage: 'Work queue',
        })}
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage(
            (total ?? 0) === 1
              ? { id: 'work_item_count_header_singular', defaultMessage: '1 Work Item' }
              : { id: 'work_queue_count_header', defaultMessage: '{count} Work Items' },
            { count: total ?? 0 }
          )}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <WorkFilter workTypes={activeWorkTypes} />
      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={
            (hasRole('allocateWork') || hasRole('addWork')) &&
            '/works/management'
          }
          addButtonText={formatMessage({
            id: 'manage',
            defaultMessage: 'Manage',
          })}
        />

        {loading ? <Loading /> : <WorkList workQueue={workQueue} sortable />}
        <Pagination total={total} data={workQueue} onLoadMore={loadMore} />
      </div>
    </>
  );
};

export default WorkQueueView;
