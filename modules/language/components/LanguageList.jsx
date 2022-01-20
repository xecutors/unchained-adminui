import { useIntl } from 'react-intl';
import ListHeader from '../../common/components/ListHeader';
import ListPagination from '../../common/components/ListPagination';

import LanguageListItem from './LanguageListItem';

const LanguageList = ({
  languages,
  onRemove,
  onLoadMore,
  total,
  onLimitChange,
  includeInactive,
  onIncludeInactiveChange,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="bg-white m-2 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <ListHeader addPath="/language/new">
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
                    id: 'show_inactive',
                    defaultMessage: 'Show inactive',
                  })}
                </label>
              </div>
            </ListHeader>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'iso_code',
                      defaultMessage: 'ISO code',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({ id: 'name', defaultMessage: 'Name' })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({ id: 'active', defaultMessage: 'Active' })}
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

      <ListPagination
        onLoadMore={onLoadMore}
        data={languages}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default LanguageList;
