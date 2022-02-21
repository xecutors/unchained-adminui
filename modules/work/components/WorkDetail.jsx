const WorkDetail = ({ work }) => {
  const formattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const typeStyle = `${
    work?.status === 'NEW'
      ? 'bg-slate-300'
      : work?.status === 'ALLOCATED'
      ? 'bg-slate-100'
      : work?.status === 'SUCCESS'
      ? 'bg-green-500 text-black'
      : work?.status === 'FAILED'
      ? 'bg-red-500 text-white'
      : 'bg-yellow-200 text-red-500'
  }`;

  return (
    <>
      <div className="w-full border-t border-gray-300" />

      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {/*<div className="sm:col-span-2 flex flex-col sm:flex-row gap-x-10 items-center">
            <div className="text-sm font-medium text-gray-500">Work Type</div>
            <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.type}
            </div>
          </div>

          {/* <div className="sm:col-span-2">
            <div className="text-sm font-medium text-gray-500">Success</div>
            <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.success}
            </div>
          </div> */}

          {/* <div className="sm:col-span-2 flex flex-col sm:flex-row gap-x-10 items-center">
            <div className="text-sm font-medium text-gray-500">Work Status</div>
            <div
              className={`mt-1 max-w-prose text-sm text-gray-900 space-y-5 ${typeStyle}  p-2`}
            >
              {work?.status}
            </div>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Started At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.started)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Finished At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.finished)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.created)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.updated)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Deleted At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.deleted)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Scheduled At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formattedDate(work?.scheduled)}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Priority</dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.priority}
            </dd>
          </div> */}
          {/* <div className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-500">Worker</dt>
          <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
            {work?.status}
          </dd>
        </div> */}
          {/* <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Work Result</dt>
            {Object.keys(work?.result).forEach((key) => {
              <>
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                  {work.result[key]}
                </dd>
              </>;
            })}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Error</dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.error || 'Null'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Original</dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.original || 'Null'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Retries</dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.retries}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Timeout</dt>
            <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
              {work?.timeout || 'Null'}
            </dd>
          </div>*/}

          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-3 lg:p-4">
            <div className="flex gap-x-10 items-center">
              <div className="text-sm font-medium text-gray-500 mr-4">
                Work Type:
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.type}
              </div>
            </div>
            <div className="flex gap-x-10 items-center">
              <div className="text-sm font-medium text-gray-500">
                Work Status
              </div>
              <div
                className={`mt-1 max-w-prose text-sm rounded-full text-gray-900 space-y-5 ${typeStyle} py-2 px-6`}
              >
                {work?.status}
              </div>
            </div>
            <div className="flex gap-x-10 items-center">
              <div className="text-sm font-medium text-gray-500">Priority</div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.priority}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8"></div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8"></div>
          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8"></div>
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
