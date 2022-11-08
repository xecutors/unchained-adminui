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
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';

const WorkQueueView = () => {
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();

  const filter = {
    created: {
      start: query?.start?.replaceAll('-', '/'),
      end: query?.end?.replaceAll('-', '/'),
    },
    status: query?.status?.split(','),
    types: query?.types?.split(','),
  };

  const limit = parseInt(query?.limit, 10) || DefaultLimit;

  const sort = query?.sort || '';

  const { queryString, ...restQuery } = query;

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

  const { workQueue, loadMore, loading, activeWorkTypes } = useWorkQueue({
    queryString,
    limit,
    ...filter,
    sort: sortKeys,
  });

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
          headerText={formatMessage({
            id: 'work_queue_header',
            defaultMessage: 'Work queue',
          })}
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
            (hasRole(ACTION_ROLES.work.allocateWork) ||
              hasRole(ACTION_ROLES.work.doWork) ||
              hasRole(ACTION_ROLES.work.add)) &&
            '/works/management'
          }
          addButtonText={formatMessage({
            id: 'manage',
            defaultMessage: 'Manage',
          })}
        />

        {loading ? <Loading /> : <WorkList workQueue={workQueue} sortable />}
        <Pagination data={workQueue} onLoadMore={loadMore} />
      </div>
    </>
  );
};

export default WorkQueueView;
