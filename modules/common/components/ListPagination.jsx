import { FormattedMessage, useIntl } from 'react-intl';
import { DefaultLimit, LimitSteps } from '../data/miscellaneous';

const ListPagination = ({ languages, onLoadMore, total, onLimitChange }) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <FormattedMessage
            id="app.greeting"
            defaultMessage="<p> Showing <span>1</span> to <span>{current}</span> of <span>{total}</span> results </p>"
            values={{
              p: (chunks) => <p className="text-sm text-gray-700">{chunks}</p>,
              span: (chunks) => <span className="font-medium">{chunks}</span>,
              icon: <svg />,
              current: languages?.length,
              total,
            }}
          />
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <select
              onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
              id="location"
              defaultValue={DefaultLimit}
              name="location"
              className="mt-3 h-8 block w-full pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {LimitSteps.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onLoadMore}
            type="button"
            className="mt-8 ml-2 mr-2 relative items-center px-1 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formatMessage({ id: 'load_more', defaultMessage: 'Load more' })}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ListPagination;
