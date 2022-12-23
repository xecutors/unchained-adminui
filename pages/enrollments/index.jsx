import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EnrollmentList from '../../modules/enrollment/components/EnrollmentList';
import useEnrollments from '../../modules/enrollment/hooks/useEnrollments';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import { extractQuery } from '../../modules/common/utils/normalizeFilterKeys';
import useEnrollmentStatusTypes from '../../modules/enrollment/hooks/useEnrollmentStatusTypes';

const EnrollmentListView = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
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

  const { enrollments, enrollmentsCount, loading } = useEnrollments({
    queryString,
    limit,
    offset,
    sort: sortKeys,
    status: query?.status?.split(','),
  });

  const { enrollmentStatusTypes } = useEnrollmentStatusTypes();

  const ENROLLMENT_STATUS =
    enrollmentStatusTypes?.map(({ value }) => value) || [];

  const statusChangeHandler = (e) => {
    const { status, ...rest } = query;

    if (e.target.checked) {
      const newStatus = [...extractQuery(status), e.target.name];
      const newStatusValue =
        newStatus.length === 1 && e.target.value === 'DELETED'
          ? ENROLLMENT_STATUS.join(',')
          : newStatus?.join(',');

      push({
        query: normalizeQuery(rest, newStatusValue, 'status'),
      });
    } else {
      const newStatus = [...extractQuery(status)].filter(
        (v) => v !== e.target.value,
      );

      if (newStatus.length)
        push({
          query: normalizeQuery(query, newStatus?.join(','), 'status'),
        });
      // initial query or to replicate the behavior in the engine when no status is selected
      else {
        const newWorkerStatus = ENROLLMENT_STATUS.filter(
          (stat) => stat !== e.target.value && stat !== 'DELETED',
        ).join(',');

        push({
          query: normalizeQuery(rest, newWorkerStatus, 'status'),
        });
      }
    }
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'enrollments_list_header',
            defaultMessage: 'Enrollments',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div>
        <p className="mt-0 text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="m-1 mt-3 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          {ENROLLMENT_STATUS.map((status) => (
            <div
              className="inline-flex items-center rounded-md bg-white dark:bg-slate-800 py-2 px-4 text-sm font-medium text-indigo-800 shadow-sm dark:shadow-none"
              key={status}
            >
              <input
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
                type="checkbox"
                id={status}
                name={status}
                value={status}
                checked={
                  extractQuery(query?.status).includes(status) || !query?.status
                }
                onChange={statusChangeHandler}
              />
              <div className="ml-2">
                <label
                  className="text-sm text-slate-600 dark:text-slate-200"
                  htmlFor={status}
                >
                  {status}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader />

        {loading ? (
          <Loading />
        ) : (
          <EnrollmentList enrollments={enrollments} showUser sortable />
        )}
        <Pagination data={enrollments} total={enrollmentsCount} />
      </div>
    </>
  );
};

export default EnrollmentListView;
