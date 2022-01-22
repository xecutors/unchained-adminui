import { useIntl } from 'react-intl';
import ListHeader from '../common/components/ListHeader';
import ListPagination from '../common/components/ListPagination';
import AsssortmentListItem from './AsssortmentListItem';

const AsssortmentList = ({
  asssortments,
  total,
  onLimitChange,
  onLoadMore,
  onSearch,
  includeInactive,
  onIncludeInactiveChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <div className="w-full">
            <label htmlFor="search" className="sr-only">
              {formatMessage({ id: 'search', defaultMessage: 'Search' })}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => onSearch(e.target.value)}
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-300 text-sm rounded-md py-2 pl-10 pr-3 "
                placeholder="Search"
                type="search"
              />
            </div>
          </div>

          <ListHeader addPath="/asssortments/new">
            <div className="flex items-center h-5">
              <input
                id="include-inactive"
                aria-describedby="include-inactive"
                name="include-inactive"
                type="checkbox"
                checked={includeInactive}
                onChange={() => onIncludeInactiveChange(!includeInactive)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="show-guests"
                className="ml-3 font-medium text-gray-700"
              >
                {formatMessage({
                  id: 'show_non_root_nodes',
                  defaultMessage: 'Show non-root nodes?',
                })}
              </label>
            </div>
          </ListHeader>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Name',
                  })}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'active',
                    defaultMessage: 'Active',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'base',
                    defaultMessage: 'Base?',
                  })}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {asssortments?.map((asssortment) => (
                <AsssortmentListItem
                  key={asssortment?._id}
                  asssortment={asssortment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListPagination
        onLoadMore={onLoadMore}
        data={asssortments}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default AsssortmentList;
