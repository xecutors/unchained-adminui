import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';

const PaymentCredentialsView = ({ paymentCredentials }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="my-8 p-8 w-full flex items-center flex-nowrap divide-y divide-slate-200 overflow-hidden rounded-lg shadow dark:shadow-none sm:bg-white dark:sm:bg-slate-600 text-slate-900 dark:text-slate-200">
      {paymentCredentials?.length ? (
        <ul className="-my-5 divide-y divide-slate-200 dark:divide-slate-700 flex-grow">
          {(paymentCredentials || []).map(
            ({ _id: paymentCredentialsId, isPreferred, isActive, isValid }) => (
              <li className="py-4" key={paymentCredentialsId}>
                <div className=" flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {paymentCredentialsId}
                    </p>
                    {isPreferred && (
                      <p className="truncate text-sm text-slate-500 dark:text-slate-200">
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
