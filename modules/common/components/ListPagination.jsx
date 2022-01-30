import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FormattedMessage, useIntl } from 'react-intl';
import {
  DefaultLimit,
  LimitSteps,
  stopPropagation,
} from '../data/miscellaneous';

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
  total = 0,
  data = [],
  onLimitChange,
  limit,
  offset,
  onOffsetChange,
}) => {
  const { formatMessage } = useIntl();

  const currentPage = offset === 0 ? 1 : Math.ceil((offset + 1) / limit);

  const addStep = (number) => {
    const stepOffset = number - 1;
    return (
      <Step
        key={`start-${stepOffset}`}
        type="button"
        onClick={() => onOffsetChange(limit * stepOffset)}
        aria-current="page"
        disabled={currentPage === number}
        label={number}
      />
    );
  };

  const Steps = () => {
    const steps = [];
    const pages = total ? Math.floor(total / limit) : 0;
    const center = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];

    const filteredCenter = center
      .filter((p) => p > 1 && p < pages)
      .map((a) => addStep(a));

    const includeThreeLeft = currentPage === 5;
    const includeThreeRight = currentPage === pages - 4;
    const includeLeftDots = currentPage > 5;
    const includeRightDots = currentPage < pages - 4;

    if (includeThreeLeft) filteredCenter.unshift(addStep(2));
    if (includeThreeRight) filteredCenter.push(addStep(pages - 1));

    if (includeLeftDots)
      filteredCenter.unshift(
        <Step
          key="dash-1"
          type="button"
          aria-current="page"
          onClick={stopPropagation}
          label="..."
        />,
      );
    if (includeRightDots)
      filteredCenter.push(
        <Step
          key="dash-2"
          type="button"
          aria-current="page"
          onClick={stopPropagation}
          label="..."
        />,
      );
    steps.push(addStep(1));
    steps.push(...filteredCenter);

    if (pages > 0) {
      steps.push(addStep(pages));
    }
    return steps;
  };

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
              id="paginated-data"
              defaultMessage="<p> Showing <span>{from}</span> to <span>{to}</span> of <span>{total}</span> results </p>"
              values={{
                p: (chunks) => (
                  <p className="text-sm text-gray-700">{chunks}</p>
                ),
                span: (chunks) => <span className="font-medium">{chunks}</span>,
                to: offset + 1 + data.length,
                from: offset + 1,
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
            defaultValue={limit}
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
ListPagination.defaultProps = {
  data: [],
  total: 0,
};

ListPagination.propTypes = {
  total: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  onLimitChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
};

export default ListPagination;
