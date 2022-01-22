import { useIntl } from 'react-intl';
import ListHeader from '../common/components/ListHeader';
import ListPagination from '../common/components/ListPagination';
import FilterListItem from './FilterListItem';

const FilterList = ({ filters, onLoadMore, total, onLimitChange }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 ">
          <ListHeader addPath="/filters/new" />

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Key(Name)',
                  })}
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {formatMessage({
                    id: 'type',
                    defaultMessage: 'Type',
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
                    id: 'options',
                    defaultMessage: 'Options',
                  })}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filters?.map((filter) => (
                <FilterListItem key={filter?._id} filter={filter} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListPagination
        onLoadMore={onLoadMore}
        data={filters}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default FilterList;
