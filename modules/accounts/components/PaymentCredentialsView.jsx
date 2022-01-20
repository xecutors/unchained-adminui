import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const PaymentCredentialsView = ({ paymentCredentials }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="bg-white shadow overflow-hidden border-b border-gray-200">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="pb-4 py-5 px-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {formatMessage({
              id: 'payment_credentials',
              defaultMessage: 'Payment credentials',
            })}
          </h3>
        </div>

        <div className="px-5 py-4 flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {(paymentCredentials || []).map(
              ({
                _id: paymentCredentialsId,
                isPreferred,
                isActive,
                isValid,
              }) => (
                <li className="py-4" key={paymentCredentialsId}>
                  <div className=" flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {paymentCredentialsId}
                      </p>
                      {isPreferred && (
                        <p className="text-sm text-gray-500 truncate">
                          <Badge
                            text={formatMessage({
                              id: 'preferred',
                              defaultMessage: 'Preferred',
                            })}
                            color="green"
                            square
                          />
                        </p>
                      )}
                    </div>
                    <div>
                      {isActive ? (
                        <Badge
                          text={formatMessage({
                            id: 'active',
                            defaultMessage: 'Active',
                          })}
                          color="green"
                          square
                        />
                      ) : (
                        <Badge
                          text={formatMessage({
                            id: 'in_active',
                            defaultMessage: 'In-Active',
                          })}
                          color="red"
                          square
                        />
                      )}
                    </div>
                    <div>
                      {isValid ? (
                        <Badge
                          text={formatMessage({
                            id: 'valid',
                            defaultMessage: 'Valid',
                          })}
                          color="green"
                          square
                        />
                      ) : (
                        <Badge
                          text={formatMessage({
                            id: 'in_valid',
                            defaultMessage: 'InValid',
                          })}
                          color="red"
                          square
                        />
                      )}
                    </div>
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentCredentialsView;
