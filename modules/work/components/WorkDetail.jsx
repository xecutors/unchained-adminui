import loadable from '@loadable/component';
const ReactJson = loadable(() => import('react-json-view'));
import { useIntl } from 'react-intl';

const WorkDetail = ({ work }) => {
  const { formatMessage } = useIntl();

  const formattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const shadowStyle = {
    NEW: '#94A3B8',
    ALLOCATED: '#B2B6F7',
    SUCCESS: '#3FFF05',
    FAILED: '#FF0505',
    DELETED: '#F9E000',
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
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-4 sm:grid-rows-2 gap-8 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm font-medium text-gray-500 mr-4">
                {formatMessage({
                  id: 'work_typel',
                  defaultMessage: 'Work Type',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.type}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_status',
                  defaultMessage: 'Work Status',
                })}
              </div>
              <div
                className={`mt-1 max-w-prose text-sm rounded-full text-gray-900 space-y-5 ${
                  typeStyle[work?.status]
                } py-2 px-6`}
              >
                {work?.status}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_priority',
                  defaultMessage: 'Priority',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.priority}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_retries',
                  defaultMessage: 'Retries',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.retries}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'worker',
                  defaultMessage: 'Worker',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.worker}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2">
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_started',
                    defaultMessage: 'Started',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.started)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_finished',
                    defaultMessage: 'Finished',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.finished)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_created',
                    defaultMessage: 'Created',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.created)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_updated',
                    defaultMessage: 'Updated',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.updated)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.deleted)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'work_scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </div>
                <div className="mt-1 text-sm text-gray-900">
                  {formattedDate(work?.scheduled)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="sm:col-span-1">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_result',
                  defaultMessage: 'Work Result',
                })}
              </div>

              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.result} collapsed={true} />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_input',
                  defaultMessage: 'Work Input',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.input} collapsed={true} />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'work_original',
                  defaultMessage: 'Orginial Work',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.work} collapsed={true} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 sm:p-6 lg:p-8">
            <div className="">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'error',
                  defaultMessage: 'Error',
                })}
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.error ? (
                  <ReactJson src={work?.error} collapsed={true} />
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
