import { useIntl } from 'react-intl';
import ListHeader from '../../common/components/ListHeader';
import ListPagination from '../../common/components/ListPagination';
import Toggle from '../../common/components/Toggle';
import CountryListItem from './CountryListItem';

const CountryList = ({
  countries,
  onLoadMore,
  total,
  onLimitChange,
  onRemoveCountry,
  includeInactive,
  onIncludeInactiveChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="bg-white m-2 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <ListHeader addPath="/country/new">
              <Toggle
                toggleText={formatMessage({
                  id: 'show_inactive',
                  defaultMessage: 'Show inactive',
                })}
                toggleState={includeInactive}
                onToggle={onIncludeInactiveChange}
              />
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
                    {formatMessage({
                      id: 'default_currency',
                      defaultMessage: 'Default currency',
                    })}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    &nbsp;
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">
                      {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {countries?.map((country) => (
                  <CountryListItem
                    key={country._id}
                    country={country}
                    onRemove={onRemoveCountry}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ListPagination
        onLoadMore={onLoadMore}
        data={countries}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default CountryList;
