import { useIntl } from 'react-intl';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import Badge from '../../common/components/Badge';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { WORK_STATUSES, getShadowStyle } from '../../common/data/miscellaneous';
import JSONView from '../../common/components/JSONView';
import useFormatWorkDurations from '../hooks/useFormatWorkDurations';

const WorkDetail = ({ work }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { getDuration, getScheduledTime } = useFormatWorkDurations();
  const [, reRenderComponent] = useState(null);

  useEffect(() => {
    let interval = null;
    if (work && (work.status === 'NEW' || work.status === 'ALLOCATED')) {
      interval = setInterval(() => reRenderComponent(Date.now()), 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [work?.status]);

  const options = {
    timeStyle: 'medium',
    dateStyle: 'long',
  };

  return (
    <div className={`my-4 p-2 sm:p-6 lg:p-8 ${getShadowStyle(work?.status)}`}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="max-h-fit col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-md dark:shadow-none sm:p-6 lg:col-span-1 lg:p-8 ">
          <div className="mb-2 flex flex-wrap items-center justify-between">
            <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
            <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
            <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
            <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
            <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
                'n/a'
              )}
            </div>
          </div>
          {work?.retries ? (
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_original',
                  defaultMessage: 'Original Work',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm">
                <Link
                  href={`/works/${work?.work?._id}`}
                  className="text-blue-600 dark:text-blue-400"
                >
                  {work?.work?._id}
                </Link>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-md dark:shadow-none sm:p-6 lg:col-span-1 lg:p-8">
          <div className="grid grid-cols-2 gap-5">
            <div className="sm:col-span-1">
              <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
              <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_scheduled',
                  defaultMessage: 'Scheduled',
                })}
              </div>
              <div className="flex text-sm">{getScheduledTime(work)}</div>
            </div>
            <div className="sm:col-span-1">
              <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
              <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
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
              <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'duration',
                  defaultMessage: 'Duration',
                })}
              </div>
              <div className="flex text-sm">{getDuration(work)}</div>
            </div>
            {work?.deleted && (
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 dark:text-slate-200 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="flex text-sm">
                  {formatDateTime(work?.deleted, options)}
                </div>
              </div>
            )}
          </div>
        </div>

        {work?.input && (
          <div className="col-span-2  bg-white dark:bg-slate-900 lg:col-span-1">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {formatMessage({ id: 'input', defaultMessage: 'Input' })}
              </h3>
            </div>
            <JSONView
              value={JSON.stringify(work.input, null, 2)}
              disabled
              className="  block w-full max-w-full  resize-none sm:text-sm"
            />
          </div>
        )}

        {work?.result && (
          <div className="col-span-2  bg-white dark:bg-slate-900   lg:col-span-1 ">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {formatMessage({ id: 'result', defaultMessage: 'Result' })}
              </h3>
            </div>
            <JSONView
              value={JSON.stringify(work.result, null, 2)}
              disabled
              className="  block w-full max-w-full  resize-none sm:text-sm"
            />
          </div>
        )}
        {work?.error && (
          <div className="col-span-2  bg-white dark:bg-slate-900  lg:col-span-1 ">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6  text-red-500">
                {formatMessage({ id: 'error', defaultMessage: 'Error' })}
              </h3>
            </div>
            <JSONView
              value={decodeURI(JSON.stringify(work.error, null, 2))}
              disabled
              className="  block w-full max-w-full  resize-none sm:text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkDetail;
