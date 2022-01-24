import Link from 'next/link';
import { useIntl } from 'react-intl';

import ProviderListItem from './ProvidersListItem';
import Table from './Table';

const ProviderList = ({
  providers,
  onProviderFilterChange,
  providerType = [],
  providerPath,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="shadow overflow-hidden border-b border-gray-200 bg-white px-4 py-2 sm:px-6">
        <div className=" -ml-4  -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
          <div className=" ml-2 mt-2 w-100">
            <div className=" relative flex items-start ">
              <div className="mt-1">
                <select
                  onChange={(e) =>
                    onProviderFilterChange(e.target.value || null)
                  }
                  defaultValue={null}
                  id="select-type"
                  name="select-type"
                  placeholder={formatMessage({
                    id: 'filter_by_type',
                    defaultMessage: 'Filter by type',
                  })}
                  input-hint="Filter provider by type"
                  autoComplete="off"
                  className="shadow-sm w-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                  className="h-3 w-3"
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

      <Table className="min-w-full ">
        {providers?.map((provider) => (
          <Table.Row key={provider._id} className="bg-white " header>
            <Table.Cell className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'interface',
                defaultMessage: 'Interface',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              {formatMessage({
                id: 'problems',
                defaultMessage: 'Problems',
              })}
            </Table.Cell>

            <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
              &nbsp;
            </Table.Cell>
          </Table.Row>
        ))}
        {providers?.map((provider) => (
          <ProviderListItem key={`${provider?._id}111`} provider={provider} />
        ))}
      </Table>
    </>
  );
};

export default ProviderList;
