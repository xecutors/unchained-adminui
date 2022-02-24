import loadable from '@loadable/component';
import { useIntl } from 'react-intl';
import Link from 'next/link';

import Badge from '../../common/components/Badge';

const ReactJson = loadable(() => import('react-json-view'));

const WorkDetail = ({ work }) => {
  const { formatMessage, formatDate } = useIntl();

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const shadowStyle = {
    NEW: '#60a5fa',
    ALLOCATED: '#B2B6F7',
    SUCCESS: '#4ade80',
    FAILED: '#f87171',
    DELETED: '#facc15',
  };

  const typeStyle = {
    NEW: 'bg-slate-400',
    ALLOCATED: 'bg-blue-400',
    SUCCESS: 'bg-green-400',
    FAILED: 'bg-red-400',
    DELETED: 'bg-yellow-400',
  };

  return (
    <>
      <div className="w-full border-t border-gray-300" />

      <div
        className={`my-4 p-2 sm:p-6 lg:p-8 flex justify-center items-center shadow-[inset_-5px_5px_5px_0px_${
          shadowStyle[work?.status]
        },inset_5px_-5px_5px_0px_${shadowStyle[work?.status]}]`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-5 sm:grid-rows-3 gap-8 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_typel',
                  defaultMessage: 'Work Type',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.type}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_status',
                  defaultMessage: 'Work Status',
                })}
              </div>
              <div
                className={`mt-2 max-w-prose text-sm rounded-full text-gray-900 space-y-5 ${
                  typeStyle[work?.status]
                } py-1 px-5`}
              >
                {work?.status}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_priority',
                  defaultMessage: 'Priority',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.priority}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_retries',
                  defaultMessage: 'Retries',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.retries}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'worker',
                  defaultMessage: 'Worker',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                <Badge
                  text={formatMessage({
                    id: 'worker',
                    defaultMessage: `${work?.worker}`,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 sm:justify-items-center">
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_started',
                    defaultMessage: 'Started',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.started, options)}
                </div>
              </div>
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_finished',
                    defaultMessage: 'Finished',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.finished, options)}
                </div>
              </div>
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_created',
                    defaultMessage: 'Created',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.created, options)}
                </div>
              </div>
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_updated',
                    defaultMessage: 'Updated',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.updated, options)}
                </div>
              </div>
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.deleted, options)}
                </div>
              </div>
              <div className="sm:col-span-1 mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 flex justify-center items-center">
                  {formatMessage({
                    id: 'work_scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </div>
                <div className="mt-2 text-sm text-gray-900 flex justify-center items-center">
                  {formatDate(work?.scheduled, options)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col justify-between items-start min-h-full">
              <div className="mb-2">
                <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                  {formatMessage({
                    id: 'work_result',
                    defaultMessage: 'Work Result',
                  })}
                </div>

                <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                  <ReactJson src={work?.result} collapsed />
                </div>
              </div>

              {work?.retries ? (
                <div className="mb-2">
                  <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                    {formatMessage({
                      id: 'work_original',
                      defaultMessage: 'Orginial Work',
                    })}
                  </div>
                  <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                    <Link href={`/works/${work?.work?._id}`}>
                      <a className="text-blue-600">{work?.work.type}</a>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_input',
                  defaultMessage: 'Work Input',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.input} collapsed />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="mb-2">
              <div className="text-base font-semibold sm:font-bold sm:text-lg text-gray-500 mr-4">
                {formatMessage({
                  id: 'error',
                  defaultMessage: 'Error',
                })}
              </div>
              <div className="mt-2 max-w-prose text-sm text-gray-900 space-y-5">
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
