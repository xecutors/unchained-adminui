import { FormattedMessage, useIntl } from 'react-intl';
import AddButton from '../../common/components/ListHeader';
import { DefaultLimit, LimitSteps } from '../../common/data/miscellaneous';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({
  languages,
  onRemove,
  onLoadMore,
  total,
  onLimitChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="m-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <AddButton headerText="Language" addPath="/language/add" />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ISO Codee
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Active?
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    &nbsp;
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {languages?.map((language) => (
                  <LanguageListItem
                    key={language._id}
                    language={language}
                    onRemove={onRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            {formatMessage({ id: 'load_more', defaultMessage: 'Load more' })}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LanguageList;
