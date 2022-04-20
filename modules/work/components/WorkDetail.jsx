import { useIntl } from 'react-intl';
import Link from 'next/link';

import Badge from '../../common/components/Badge';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { WORK_STATUSES, getShadowStyle } from '../../common/data/miscellaneous';
import Accordion from '../../common/components/Accordion';
import JSONView from '../../common/components/JSONView';
import AccordionHeader from '../../common/components/AccordionHeader';
import NoData from '../../common/components/NoData';

const WorkDetail = ({ work }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const data = [
    {
      header: (
        <AccordionHeader
          name={formatMessage({ id: 'input', defaultMessage: 'Input' })}
        />
      ),
      body: (
        <div className="mt-2 text-sm">
          {work?.input ? (
            <JSONView
              value={JSON.stringify(work.input, null, 2)}
              disabled
              className=" mt-1 block w-full max-w-full rounded-md border-2 resize-none sm:text-sm"
            />
          ) : (
            <NoData
              className="bg-white dark:bg-slate-600 rounded-md capitalize border-2 border-slate-200"
              message={formatMessage({
                id: 'no_result',
                defaultMessage: 'Result',
              })}
            />
          )}
        </div>
      ),
    },
    {
      header: (
        <AccordionHeader
          name={formatMessage({ id: 'result', defaultMessage: 'Result' })}
        />
      ),
      body: (
        <div className="mt-2 text-sm">
          {work?.result ? (
            <JSONView
              value={JSON.stringify(work.result, null, 2)}
              disabled
              className="mt-1 block w-full max-w-full rounded-md border-2 resize-none sm:text-sm"
            />
          ) : (
            <NoData
              className="bg-white dark:bg-slate-600 rounded-lg capitalize border-2 border-slate-200"
              message={formatMessage({
                id: 'no_result',
                defaultMessage: 'Result',
              })}
            />
          )}
        </div>
      ),
    },

    {
      header: (
        <AccordionHeader
          name={formatMessage({ id: 'error', defaultMessage: 'Error' })}
        />
      ),
      body: (
        <div className="mt-2 text-sm">
          {work?.error ? (
            <JSONView
              value={decodeURI(JSON.stringify(work.error, null, 2))}
              disabled
              className="mt-1 block w-full max-w-full rounded-md border-2 resize-none  sm:text-sm"
            />
          ) : (
            <NoData
              className="bg-white dark:bg-slate-600 rounded-lg capitalize border-2 border-slate-200"
              message={formatMessage({
                id: 'no_error',
                defaultMessage: 'Error',
              })}
            />
          )}
        </div>
      ),
    },
  ];

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 ';

  return (
    <>
      <div className={`my-4 p-2 sm:p-6 lg:p-8 ${getShadowStyle(work?.status)}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="max-h-fit col-span-2 rounded-lg border border-slate-200 bg-white dark:bg-slate-600 p-4 shadow-md dark:shadow-white sm:p-6 lg:col-span-1 lg:p-8 ">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_type',
                  defaultMessage: 'Work type',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm">
                {work?.type}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_status',
                  defaultMessage: 'Work Status',
                })}
              </div>
              <div
                className={`mt-2 max-w-prose space-y-5 rounded-full py-1 px-5 text-sm text-${
                  WORK_STATUSES[work?.status]
                }-800 bg-${WORK_STATUSES[work?.status]}-200`}
              >
                {work?.status}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_priority',
                  defaultMessage: 'Priority',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm ">
                {work?.priority}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_retries',
                  defaultMessage: 'Retries',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm">
                {work?.retries}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'worker',
                  defaultMessage: 'Worker',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm">
                {work?.worker ? (
                  <Badge
                    text={formatMessage(
                      {
                        id: 'worker_dynamic',
                        defaultMessage: '{worker}',
                      },
                      {
                        worker: work?.worker,
                      },
                    )}
                    color="purple"
                    className="bg-purple-200 font-bold"
                  />
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            {work?.retries ? (
              <div className="mb-2 flex flex-wrap items-center justify-between">
                <div className="mr-4 text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_original',
                    defaultMessage: 'Original Work',
                  })}
                </div>
                <div className="mt-2 max-w-prose space-y-5 text-sm">
                  <Link href={`/works/${work?.work?._id}`}>
                    <a className="text-blue-600 dark:text-blue-400">
                      {work?.work?._id}
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="col-span-2 rounded-lg border border-slate-200 bg-white dark:bg-slate-600 p-4 shadow-md dark:shadow-white sm:p-6 lg:col-span-1 lg:p-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_created',
                    defaultMessage: 'Created',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.created, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.scheduled, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_started',
                    defaultMessage: 'Started',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.started, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_finished',
                    defaultMessage: 'Finished',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.finished, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_updated',
                    defaultMessage: 'Updated',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.updated, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-white sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.deleted, options)}
                </div>
              </div>
            </div>
          </div>

          <Accordion
            data={data}
            headerCSS={headerCSS}
            bodyCSS="rounded-none"
            itemContainerCSS="col-span-2 border-0 shadow-none"
            containerCSS="col-span-2 grid grid-cols-1 gap-8 lg:grid-cols-2"
          />
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
