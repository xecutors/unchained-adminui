import { ClockIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import Accordion from '../../../../modules/common/components/Accordion';
import BreadCrumbs from '../../../../modules/common/components/BreadCrumbs';
import Loading from '../../../../modules/common/components/Loading';
import PageHeader from '../../../../modules/common/components/PageHeader';
import useWork from '../../../../modules/work/hooks/useWork';

const convertJobSignalToNumber = (signal) => {
  if (signal === '🙌') {
    return true;
  }

  return false;
};

const JobSyncStat = ({ new: added, removed, total, diff }) => {
  return (
    <>
      new {added} removed {removed} diff {diff} total {total}{' '}
    </>
  );
};

const JobSyncHealth = ({ signal, duration }) => {
  return (
    <>
      {signal} {duration}
    </>
  );
};

const JobHeader = ({ job }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm font-medium text-indigo-600 truncate">
        {job._id}
      </div>
      <div className=" items-end flex-col">
        <div
          className={classNames(
            'text-xs leading-5 font-semibold rounded-full  text-gray-800',
          )}
        >
          {formatMessage(
            {
              id: 'started_at',
              defaultMessage: 'Started: {time}',
            },
            {
              time: format(new Date(job.started), 'Pp'),
            },
          )}
        </div>
        <div
          className={classNames(
            'mt-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
            {
              'bg-yellow-100 text-yellow-800': !convertJobSignalToNumber(
                job.sync.signal,
              ),
            },
          )}
        >
          {formatMessage(
            {
              id: 'finished_at',
              defaultMessage: 'Finished: {time}',
            },
            {
              time: format(new Date(job.finished), 'Pp'),
            },
          )}
        </div>
        <div className="mt-2 inline-flex justify-between items-center text-sm text-gray-500 sm:mt-0">
          <ClockIcon className="h-5 w-5 mr-2" viewBox="0 0 22 22" />

          {job.sync.duration}
          {convertJobSignalToNumber(job.sync.signal) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 rounded-full"
              viewBox="0 0 20 20"
              fill="green"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="yellow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

const JobBody = ({ job }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'solr',
                defaultMessage: 'Solr',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncHealth {...job.solr} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'crossbase',
                defaultMessage: 'Crossbase',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncHealth {...job.crossbase} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'navision',
                defaultMessage: 'Navision',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncHealth {...job.navision} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'categories',
                defaultMessage: 'Categories',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncStat {...job.categories} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'products',
                defaultMessage: 'Products',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncStat {...job.products} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({
                id: 'filters',
                defaultMessage: 'Filters',
              })}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <JobSyncStat {...job.filters} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const SyncJobs = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;
  const { result } = work;
  const {
    sync: { jobs },
  } = result;

  const accordionData = jobs.map((job) => {
    return {
      header: <JobHeader job={job} />,
      body: <JobBody job={job} />,
    };
  });

  return (
    <div className="p-5">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'sync_jobs',
          defaultMessage: 'Sync jobs',
        })}
      />
      <div className=" p-2 bg-white  overflow-hidden sm:rounded-md">
        {!jobs?.length ? (
          <p>No sync report found</p>
        ) : (
          <Accordion containerCSS="p-3" data={accordionData} />
        )}
      </div>
    </div>
  );
};

export default SyncJobs;
