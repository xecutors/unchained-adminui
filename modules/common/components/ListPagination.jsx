import classNames from 'classnames';

import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLimit, LimitSteps } from '../data/miscellaneous';
import Loading from './Loading';

const Step = ({ onClick, disabled, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current="page"
      disabled={disabled}
      className={classNames(
        'bg-white border-gray-300 text-gray-500 hover:bg-gray-50  z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
        {
          ' bg-indigo-50 border-indigo-500 text-indigo-600 ': disabled,
        },
      )}
    >
      {label}
    </button>
  );
};

const ListPagination = ({
  total,
  onLimitChange,
  isLoading,
  limit,
  offset,
  onOffsetChange,
}) => {
  const { formatMessage } = useIntl();

  const currentPage = offset === 0 ? 1 : Math.floor(offset / limit);

  const Steps = () => {
    const steps = [];
    const pages = total / limit;
    if (pages > 5) {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i <= 6; i++) {
        steps.push(
          <Step
            key={`start-${i}`}
            type="button"
            onClick={() => onOffsetChange(limit * i)}
            aria-current="page"
            disabled={currentPage === i}
            label={i}
          />,
        );
      }

      if (currentPage > 5 && currentPage <= pages - 2) {
        steps.push(
          <Step
            type="button"
            onClick={() => onOffsetChange(limit * currentPage - 1)}
            aria-current="page"
            label={currentPage - 1}
          />,
        );
        steps.push(
          <Step
            key="dash"
            type="button"
            aria-current="page"
            disabled
            label="..."
          />,
        );
        steps.push(
          <Step
            type="button"
            aria-current="page"
            disabled
            label={currentPage}
          />,
        );
        steps.push(
          <Step
            type="button"
            onClick={() => onOffsetChange(limit * currentPage + 1)}
            aria-current="page"
            label={currentPage + 1}
          />,
        );
        steps.push(
          <Step
            key="dash"
            type="button"
            aria-current="page"
            disabled
            label="..."
          />,
        );
      } else {
        steps.push(
          <Step
            key="dash"
            type="button"
            aria-current="page"
            disabled
            label="..."
          />,
        );
      }
      // eslint-disable-next-line no-plusplus
      for (let i = pages - 2; i < pages; i++) {
        steps.push(
          <Step
            key={`start-${i}`}
            type="button"
            onClick={() => onOffsetChange(limit * i)}
            aria-current="page"
            disabled={currentPage === i}
            label={i}
          />,
        );
      }
    }

    return steps;
  };

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
              defaultMessage="<p> Showing <span>{from}</span> to <span>{to}</span> of <span>{total}</span> results </p>"
              values={{
                p: (chunks) => (
                  <p className="text-sm text-gray-700">{chunks}</p>
                ),
                span: (chunks) => <span className="font-medium">{chunks}</span>,
                to: offset + limit,
                from: offset,
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
            <button
              type="button"
              disabled={!offset}
              onClick={() => onOffsetChange(offset - limit)}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-600  hover:bg-gray-50',
                {
                  'text-gray-200': !offset,
                },
              )}
            >
              <span className="sr-only">
                {formatMessage({ id: 'previous', defaultMessage: 'Previous' })}{' '}
              </span>
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
            </button>
            <Steps />

            <button
              type="button"
              onClick={() => onOffsetChange(offset + limit)}
              disabled={offset + limit >= total}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                {
                  'text-gray-200': offset + limit >= total,
                },
              )}
            >
              <span className="sr-only">
                {formatMessage({ id: 'next', defaultMessage: 'Next' })}
              </span>
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
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 h-8 flex justify-between sm:hidden">
        <button
          type="button"
          disabled={!offset}
          onClick={() => onOffsetChange(offset - limit)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {formatMessage({ id: 'previous', defaultMessage: 'Previous' })}{' '}
        </button>
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
          {formatMessage({ id: 'next', defaultMessage: 'Next' })}{' '}
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
