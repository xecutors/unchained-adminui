import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';

const PaymentCredentialsView = ({ paymentCredentials }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="my-8 flex w-full min-w-full flex-row flex-nowrap divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:bg-white">
      {paymentCredentials?.length ? (
        <ul className="-my-5 divide-y divide-gray-200">
          {(paymentCredentials || []).map(
            ({ _id: paymentCredentialsId, isPreferred, isActive, isValid }) => (
              <li className="py-4" key={paymentCredentialsId}>
                <div className=" flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {paymentCredentialsId}
                    </p>
                    {isPreferred && (
                      <p className="truncate text-sm text-gray-500">
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
      ) : (
        <NoData
          message={formatMessage({
            id: 'payment_credentials',
            defaultMessage: 'Payment credentials',
          })}
        />
      )}
    </div>
  );
};

export default PaymentCredentialsView;
