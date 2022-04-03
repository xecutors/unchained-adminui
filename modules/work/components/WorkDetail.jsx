import { useIntl } from 'react-intl';
import Link from 'next/link';

import Badge from '../../common/components/Badge';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { WORK_STATUSES } from '../../common/data/miscellaneous';
import Accordion from '../../common/components/Accordion';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import useForm from '../../forms/hooks/useForm';
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

  const shadowStyle = {
    NEW: `shadow-[inset_-5px_5px_0px_0px_#c084fc,inset_5px_-5px_0px_0px_#c084fc]`,
    ALLOCATED: `shadow-[inset_-5px_5px_0px_0px_#60a5fa,inset_5px_-5px_0px_0px_#60a5fa]`,
    SUCCESS: `shadow-[inset_-5px_5px_0px_0px_#4ade80,inset_5px_-5px_0px_0px_#4ade80]`,
    FAILED: `shadow-[inset_-5px_5px_0px_0px_#f87171,inset_5px_-5px_0px_0px_#f87171]`,
    DELETED: `shadow-[inset_-5px_5px_0px_0px_#fb923c,inset_5px_-5px_0px_0px_#fb923c]`,
  };

  const form = useForm({
    initialValues: {
      input: JSON.stringify(work?.input || {}, null, 2),
      result: JSON.stringify(work?.result || {}, null, 2),
      error: JSON.stringify(work?.error || {}, null, 2),
    },
  });

  const result = {
    header: (
      <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
        {formatMessage({
          id: 'result',
          defaultMessage: 'Result',
        })}
      </div>
    ),
    body: (
      <div className="mt-2 text-sm text-slate-900">
        {work?.result ? (
          <Form form={form}>
            <JSONAreaField
              disabled
              id="result"
              name="result"
              value={form.formik.values.result}
              rows={Math.max(
                form.formik.values.result?.split(' ')?.length / 2,
                5,
              )}
              label={formatMessage({
                id: 'result_area',
                defaultMessage: 'Result',
              })}
              hideLabel
            />
          </Form>
        ) : (
          <NoData
            className="bg-white rounded-lg border border-slate-200 shadow-md"
            message={formatMessage({
              id: 'no_result',
              defaultMessage: 'Result',
            })}
          />
        )}
      </div>
    ),
  };

  const input = {
    header: (
      <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
        {formatMessage({
          id: 'input',
          defaultMessage: 'Input',
        })}
      </div>
    ),
    body: (
      <div className="mt-2 text-sm text-slate-900">
        {work?.input ? (
          <Form form={form}>
            <JSONAreaField
              disabled
              id="input"
              name="input"
              value={form.formik.values.input}
              rows={Math.max(
                form.formik.values.input?.split(' ')?.length / 2,
                5,
              )}
              label={formatMessage({
                id: 'input_area',
                defaultMessage: 'Input',
              })}
              hideLabel
            />
          </Form>
        ) : (
          <NoData
            className="bg-white rounded-lg border border-slate-200 shadow-md"
            message={formatMessage({
              id: 'no_input',
              defaultMessage: 'Input',
            })}
          />
        )}
      </div>
    ),
  };

  const error = {
    header: (
      <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
        {formatMessage({
          id: 'error',
          defaultMessage: 'Error',
        })}
      </div>
    ),
    body: (
      <div className="mt-2 text-sm text-slate-900">
        {work?.error ? (
          <Form form={form}>
            <JSONAreaField
              disabled
              id="error"
              name="error"
              value={form.formik.values.error}
              rows={Math.max(
                form.formik.values.error?.split(' ')?.length / 2,
                5,
              )}
              label={formatMessage({
                id: 'error_area',
                defaultMessage: 'Error',
              })}
              hideLabel
            />
          </Form>
        ) : (
          <NoData
            className="bg-white rounded-lg border border-slate-200 shadow-md"
            message={formatMessage({
              id: 'no_error',
              defaultMessage: 'Error',
            })}
          />
        )}
      </div>
    ),
  };

  const headerCSS =
    'inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 ';

  return (
    <>
      <div className={`my-4 p-2 sm:p-6 lg:p-8 ${shadowStyle[work?.status]}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="max-h-fit col-span-2 rounded-lg border border-slate-200 bg-white p-4 shadow-md sm:p-6 lg:col-span-1 lg:p-8 ">
            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_type',
                  defaultMessage: 'Work type',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-slate-900">
                {work?.type}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
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
              <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_priority',
                  defaultMessage: 'Priority',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-slate-900">
                {work?.priority}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'work_retries',
                  defaultMessage: 'Retries',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-slate-900">
                {work?.retries}
              </div>
            </div>

            <div className="mb-2 flex flex-wrap items-center justify-between">
              <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                {formatMessage({
                  id: 'worker',
                  defaultMessage: 'Worker',
                })}
              </div>
              <div className="mt-2 max-w-prose space-y-5 text-sm text-slate-900">
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
                <div className="mr-4 text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_original',
                    defaultMessage: 'Original Work',
                  })}
                </div>
                <div className="mt-2 max-w-prose space-y-5 text-sm text-slate-900">
                  <Link href={`/works/${work?.work?._id}`}>
                    <a className="text-blue-600">{work?.work?._id}</a>
                  </Link>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-4 shadow-md sm:p-6 lg:col-span-1 lg:p-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_created',
                    defaultMessage: 'Created',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.created, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_scheduled',
                    defaultMessage: 'Scheduled',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.scheduled, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_started',
                    defaultMessage: 'Started',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.started, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_finished',
                    defaultMessage: 'Finished',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.finished, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'work_updated',
                    defaultMessage: 'Updated',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.updated, options)}
                </div>
              </div>
              <div className="sm:col-span-1">
                <div className="flex text-base font-semibold text-slate-500 sm:text-lg sm:font-bold">
                  {formatMessage({
                    id: 'deleted',
                    defaultMessage: 'Deleted',
                  })}
                </div>
                <div className="flex text-sm text-slate-900">
                  {formatDateTime(work?.deleted, options)}
                </div>
              </div>
            </div>
          </div>

          <Accordion
            data={[input, result, error]}
            headerCSS={headerCSS}
            bodyCSS="rounded-lg border border-slate-200 shadow-md"
            itemContainerCSS="col-span-2 border-0 shadow-none"
            containerCSS="col-span-2 grid grid-cols-1 gap-8 lg:grid-cols-2"
          />
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
