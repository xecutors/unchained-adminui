import Link from 'next/link';
import { useIntl } from 'react-intl';

import ProviderListItem from './ProvidersListItem';
import Table from './Table';

const ProviderList = ({
  providers,
  onProviderFilterChange,
  providerType = [],
  providerPath,
  onRemove,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="overflow-hidden px-4 py-2 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="w-100 ml-2 mt-2">
            <div className="relative my-2 flex items-start">
              <select
                onChange={(e) => onProviderFilterChange(e.target.value || null)}
                defaultValue={null}
                id="select-type"
                name="select-type"
                placeholder={formatMessage({
                  id: 'filter_by_type',
                  defaultMessage: 'Filter by type',
                })}
                input-hint="Filter provider by type"
                autoComplete="off"
                className="w-50 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

          <div className="ml-4 mt-2 flex-shrink-0">
            <Link href={`${providerPath}/new`}>
              <a
                type="button"
<<<<<<< HEAD
                className="rounded relative inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium  text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
=======
                className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>>>>>>> Fix provider
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
                <span className="ml-2">Add</span>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <Table className="min-w-full ">
        {providers?.map((provider) => (
          <Table.Row key={provider._id} className="bg-white " header>
            <Table.Cell className="py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              {formatMessage({
                id: 'interface',
                defaultMessage: 'Interface',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
              {formatMessage({
                id: 'problems',
                defaultMessage: 'Problems',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  uppercase tracking-wider text-gray-500">
              &nbsp;
            </Table.Cell>
          </Table.Row>
        ))}
        {providers?.map((provider) => (
          <ProviderListItem
            key={`${provider?._id}-body`}
            provider={provider}
            providerPath={providerPath}
            onRemove={onRemove}
          />
        ))}
      </Table>
    </>
  );
};

export default ProviderList;
