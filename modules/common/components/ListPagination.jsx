import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLimit, LimitSteps } from '../data/miscellaneous';
import Loading from './Loading';

const ListPagination = ({ data, total, onLimitChange, isLoading }) => {
  const { formatMessage } = useIntl();
  if (isLoading) return <Loading />;
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className=" sm:block">
          {!total ? (
            formatMessage({
              id: 'no_result_found',
              defaultMessage: 'No result found',
            })
          ) : (
            <FormattedMessage
              id="app.greeting"
              defaultMessage="<p> Showing <span>1</span> to <span>{current}</span> of <span>{total}</span> results </p>"
              values={{
                p: (chunks) => (
                  <p className="text-sm text-gray-700">{chunks}</p>
                ),
                span: (chunks) => <span className="font-medium">{chunks}</span>,
                current: data?.length,
                total,
              }}
            />
          )}
        </div>
        <div>
          <nav
            className="h-8 relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
            <a
              href="#"
              aria-current="page"
              className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>

      <div className="flex-1 h-8 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <div className="flex justify-between sm:justify-end">
          <div>
            <select
              onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
              id="location"
              defaultValue={DefaultLimit}
              name="location"
              className="h-8 block w-full   py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {LimitSteps.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:block ml-2 flex justify-between sm:justify-end">
        <div>
          <select
            onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            id="location"
            defaultValue={DefaultLimit}
            name="location"
            className=" h-8 block w-full   py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {LimitSteps.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListPagination;
