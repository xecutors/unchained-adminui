import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLimit, LimitSteps } from '../data/miscellaneous';

const ListPagination = ({ data, onLoadMore, total, onLimitChange }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <nav
        className="shadow-sm bg-white px-4 py-1 rounded-b-md flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
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
                icon: <svg />,
                current: data?.length,
                total,
              }}
            />
          )}
        </div>

        {data?.length < total && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLoadMore();
            }}
            type="button"
            className=" p-1 mt-3 mr-10 justify-center items-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formatMessage({ id: 'load_more', defaultMessage: 'Load more' })}
          </button>
        )}
        <div className=" flex justify-between sm:justify-end">
          <div>
            <select
              onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
              id="location"
              defaultValue={DefaultLimit}
              name="location"
              className="mt-2 h-8 block w-full   py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {LimitSteps.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ListPagination;
