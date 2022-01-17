import { useIntl } from 'react-intl';
import Layout from '../../modules/common/components/Layout';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';

const Payments = ({ countries, onLoadMore, total, onLimitChange }) => {
  const payment = [
    {
      Configuration: 'P5L52P8BRsZojdxKB',
      Type: 'INVOICE',
      Interface: 'Navision 1.0',
      Problems: '',
    },
    {
      Configuration: 'P5L52P8BRsZojdxKB',
      Type: 'INVOICE',
      Interface: 'Navision 1.2',
      Problems: 'co',
    },
    // More people...
  ];
  const { formatMessage } = useIntl();
  return (
    <Layout>
      <div className="m-8 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <ListHeader
                headerText={formatMessage({
                  id: 'payments',
                  defaultMessage: 'Payments',
                })}
                addPath="/payments/add-payment"
              />

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Configuration
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Interface
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Problems
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      &nbsp;
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payment.map((pay) => (
                    <tr key={pay.email}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pay.Configuration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pay.Type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pay.Interface}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pay.Problems}
                      </td>
                    </tr>
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
    </Layout>
  );
};

export default Payments;
