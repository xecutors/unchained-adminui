import { useIntl } from 'react-intl';

const PaymentCredentialsView = ({ paymentCredentials }) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({
            id: 'payment_credentials',
            defaultMessage: 'Payment credentials',
          })}
        </h3>
      </div>

      <div className=" flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {(paymentCredentials || []).map(
            ({ _id: paymentCredentialsId, isPreferred, isActive, isValid }) => (
              <li className="py-4" key={paymentCredentialsId}>
                <div className=" flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {paymentCredentialsId}
                    </p>
                    {isPreferred && (
                      <p className="text-sm text-gray-500 truncate">
                        {formatMessage({
                          id: 'preferred',
                          defaultMessage: 'Preferred',
                        })}
                      </p>
                    )}
                  </div>
                  <div>
                    {isActive
                      ? formatMessage({
                          id: 'active',
                          defaultMessage: 'Active',
                        })
                      : formatMessage({
                          id: 'in_active',
                          defaultMessage: 'In-Active',
                        })}
                  </div>
                  <div>
                    {isValid
                      ? formatMessage({
                          id: 'valid',
                          defaultMessage: 'Valid',
                        })
                      : formatMessage({
                          id: 'in_valid',
                          defaultMessage: 'InValid',
                        })}
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default PaymentCredentialsView;
