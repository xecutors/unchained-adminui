import Link from 'next/link';
import { useIntl } from 'react-intl';

import ProviderListItem from './ProvidersListItem';

const ProviderList = ({
  providers,
  onRemove,
  onProviderFilterChange,
  providerType = [],
  providerPath,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="m-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className=" -ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className=" ml-2 mt-2 w-100">
                  <div className=" relative flex items-start ">
                    <div className="mt-1">
                      <select
                        onChange={(e) => onProviderFilterChange(e.target.value)}
                        defaultValue={null}
                        id="select-type"
                        name="select-type"
                        placeholder={formatMessage({
                          id: 'filter_by_type',
                          defaultMessage: 'Filter by type',
                        })}
                        input-hint="Filter provider by type"
                        autoComplete="off"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">
                          {formatMessage({
                            id: 'filter_by_type',
                            defaultMessage: 'Filter by type',
                          })}
                        </option>
                        {providerType.map((type) => (
                          <option key={type} value={type}>
                            {formatMessage({
                              id: type,
                              defaultMessage: type,
                              description: 'Delivery provider type',
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="ml-4 mt-2 flex-shrink-0">
                  <Link href={`${providerPath}/new`}>
                    <a
                      type="button"
                      className="rounded-full relative inline-flex items-center px-3 py-3 border border-transparent shadow-sm text-sm font-medium  text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'configuration',
                      defaultMessage: 'Configuration',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({ id: 'type', defaultMessage: 'Type' })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'interface',
                      defaultMessage: 'Interface',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'problems',
                      defaultMessage: 'Problems',
                    })}
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {providers?.map((provider) => (
                  <ProviderListItem
                    editPath={providerPath}
                    key={provider._id}
                    provider={provider}
                    onRemove={onRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderList;
