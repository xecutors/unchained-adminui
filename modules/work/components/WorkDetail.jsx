import loadable from '@loadable/component';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import Badge from '../../common/components/Badge';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { WORK_STATUSES } from '../../common/data/miscellaneous';

const ReactJson = loadable(() => import('react-json-view'));

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

  const shadowStyle = {
    NEW: `shadow-[inset_-5px_5px_5px_0px_#c084fc,inset_5px_-5px_5px_0px_#c084fc]`,
    ALLOCATED: `shadow-[inset_-5px_5px_5px_0px_#60a5fa,inset_5px_-5px_5px_0px_#60a5fa]`,
    SUCCESS: `shadow-[inset_-5px_5px_5px_0px_#4ade80,inset_5px_-5px_5px_0px_#4ade80]`,
    FAILED: `shadow-[inset_-5px_5px_5px_0px_#f87171,inset_5px_-5px_5px_0px_#f87171]`,
    DELETED: `shadow-[inset_-5px_5px_5px_0px_#fb923c,inset_5px_-5px_5px_0px_#fb923c]`,
  };

  return (
    <>
      <div className="w-full border-t border-gray-300" />

      <div className={`my-4 p-2 sm:p-6 lg:p-8 ${shadowStyle[work?.status]}`}>
        <div className="grid grid-cols-1 grid-rows-4 gap-8  sm:grid-cols-2 ">
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:col-span-1 sm:p-6 lg:p-8 ">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_type',
                  defaultMessage: 'Work type',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                {work?.type}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_status',
                  defaultMessage: 'Work Status',
                })}
              </div>
              <div
                className={`mt-2 py-1 px-5 max-w-prose space-y-5 rounded-full text-sm text-${
                  WORK_STATUSES[work?.status]
                }-800 bg-${WORK_STATUSES[work?.status]}-200`}
              >
                {work?.status}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_priority',
                  defaultMessage: 'Priority',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                {work?.priority}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_retries',
                  defaultMessage: 'Retries',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                {work?.retries}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'worker',
                  defaultMessage: 'Worker',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
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
                <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_original',
                    defaultMessage: 'Orginial Work',
                  })}
                </div>
                <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                  <Link href={`/works/${work?.work?._id}`}>
                    <a className="text-blue-600">{work?.work?._id}</a>
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:col-span-1 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 sm:justify-items-center">
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_created',
                    defaultMessage: 'Created',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.created, options)}
                </div>
              </div>
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.scheduled, options)}
                </div>
              </div>
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_started',
                    defaultMessage: 'Started',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.started, options)}
                </div>
              </div>
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_finished',
                    defaultMessage: 'Finished',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.finished, options)}
                </div>
              </div>
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_updated',
                    defaultMessage: 'Updated',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.updated, options)}
                </div>
              </div>
              <div className="mb-2 sm:col-span-1">
                <div className="flex items-center justify-center text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-900">
                  {formatDateTime(work?.deleted, options)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
            <div className="mb-2">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'input',
                  defaultMessage: 'Input',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                <ReactJson src={work?.input} collapsed />
              </div>
            </div>
          </div>

          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
            <div className="flex min-h-full flex-col items-start justify-between">
              <div className="mb-2">
                <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'result',
                    defaultMessage: 'Result',
                  })}
                </div>

                <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                  <ReactJson src={work?.result} collapsed />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:p-6 lg:p-8">
            <div className="mb-2">
              <div className="mr-4 text-base font-semibold text-gray-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'error',
                  defaultMessage: 'Error',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-gray-900">
                {work?.error ? (
                  <ReactJson src={work?.error} collapsed />
                ) : (
                  'No Error'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
