import {
  ClockIcon,
  DatabaseIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/solid';
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
    <div className="ml-1 p-2 py-3 sm:flex-initial">
      <span className="relative mr-9 inline-block rounded-lg ">
        <div className="relative rounded-md bg-indigo-500 p-2 ">
          <PlusIcon
            className="h-4 w-4 text-white"
            viewBox="0 0 22 22"
            fill="currentColor"
          />
        </div>
        <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-1 py-0.5 text-sm leading-none text-red-100">
          {added}
        </span>
      </span>
      <span className="relative mr-9 inline-block  rounded-lg ">
        <div className="relative rounded-md bg-green-500 p-2 ">
          <RefreshIcon
            className="h-4 w-4 text-white"
            viewBox="0 0 22 22"
            fill="none"
          />
        </div>
        <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-1 py-0.5 text-sm leading-none text-red-100">
          {diff}
        </span>
      </span>
      <span className="relative mr-9 inline-block  rounded-lg ">
        <div className="relative rounded-md bg-red-500 p-2 ">
          <TrashIcon
            className="h-4 w-4 text-white"
            viewBox="0 0 22 22"
            fill="currentColor"
            stroke="red"
          />
        </div>
        <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-1 py-0.5 text-sm leading-none text-red-100">
          {removed}
        </span>
      </span>

      <span className="relative inline-block  rounded-lg ">
        <div className="relative rounded-md bg-green-500 p-2 ">
          <DatabaseIcon
            className="h-4 w-4 text-white"
            viewBox="0 0 22 22"
            fill="none"
          />
        </div>
        <span className="absolute top-0 right-0 mb-6 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-1 py-0.5 text-sm leading-none text-red-100">
          {total}
        </span>
      </span>
    </div>
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
    <div className="flex justify-between items-center">
      <div className="flex item-center">
        <div className="mr-2">
          {convertJobSignalToNumber(job.sync.signal) ? (
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          ) : (
            <ExclamationIcon className="h-7 w-7 text-yellow-500" />
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full text-sm leading-5">
            {formatMessage(
              {
                id: 'started_at',
                defaultMessage: 'Started: {time}',
              },
              {
                time: format(new Date(job.started), 'yyyy-MM-dd HH:mm'),
              },
            )}
          </div>
          <div
            className={classNames('rounded-full text-sm leading-5', {
              'bg-yellow-100 text-yellow-800': !convertJobSignalToNumber(
                job.sync.signal,
              ),
            })}
          >
            {formatMessage(
              {
                id: 'finished_at',
                defaultMessage: 'Finished: {time}',
              },
              {
                time: format(new Date(job.finished), 'yyyy-MM-dd HH:mm'),
              },
            )}
          </div>
        </div>
      </div>

      <div className="mr-4 flex text-sm text-slate-500 dark:text-slate-300 sm:mt-0">
        <ClockIcon className="mr-2 h-5 w-5" viewBox="0 0 22 22" />
        {job.sync.duration}
      </div>
    </div>
  );
};

const JobBody = ({ job }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="border border-slate-200 rounded-lg mt-2 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <div className="py-5 sm:p-0">
        <dl className="divide-y divide-slate-300 px-7">
          <div className="py-4 sm:py-5">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'solr',
                defaultMessage: 'Solr',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncHealth {...job.solr} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 ">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'crossbase',
                defaultMessage: 'Crossbase',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncHealth {...job.crossbase} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 ">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'navision',
                defaultMessage: 'Navision',
                description: 'Name',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncHealth {...job.navision} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 ">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'categories',
                defaultMessage: 'Categories',
              })}
            </dt>
            <dd className=" mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncStat {...job.categories} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 ">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'products',
                defaultMessage: 'Products',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncStat {...job.products} />
            </dd>
          </div>
          <div className="py-4 sm:py-5 ">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'filters',
                defaultMessage: 'Filters',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <JobSyncStat {...job.filters} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

const headerCSS =
  'inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 ';

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
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'sync_jobs',
          defaultMessage: 'Sync jobs',
        })}
      />
      <div className="sticky w-full overflow-hidden">
        {!jobs?.length ? (
          <p>No sync report found</p>
        ) : (
          <Accordion data={accordionData} headerCSS={headerCSS} />
        )}
      </div>
    </>
  );
};

export default SyncJobs;
