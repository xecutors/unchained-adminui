import { useIntl } from 'react-intl';
import Link from 'next/link';
import Badge from '../../common/components/Badge';
import NoData from '../../common/components/NoData';
import { getInterfaceLabel } from '../../common/utils/utils';

const PaymentCredentialsView = ({ paymentCredentials }) => {
  const { formatMessage } = useIntl();
  const paymentCredentialss = [
    {
      _id: 'c0b61495-24c9-46c5-897c-2b24472cf3bb',
      isPreferred: true,
      isValid: true,
      paymentProvider: {
        _id: 'a07a33d8-193e-4eee-9536-32d8e578ddd3',
        interface: {
          label: 'Lilith Tithecote',
          version: '0.9.8',
        },
      },
    },
    {
      _id: 'a93af577-5ebd-4548-9cb2-83d62fdc5740',
      isPreferred: true,
      isValid: true,
      paymentProvider: {
        _id: 'e42f4199-be3f-41d8-ae64-e557d238ef0d',
        interface: {
          label: 'Killie Telega',
          version: '4.51',
        },
      },
    },
    {
      _id: '3fee6005-4c25-442d-9e5c-33f4a31d710b',
      isPreferred: true,
      isValid: true,
      paymentProvider: {
        _id: '84611102-7f80-4020-be60-67b8b84fba5c',
        interface: {
          label: 'Mirna Plackstone',
          version: '0.1.6',
        },
      },
    },
    {
      _id: 'aed66675-39fc-4742-9787-226106b096cb',
      isPreferred: false,
      isValid: false,
      paymentProvider: {
        _id: 'bb9bca0e-7d4d-45ef-b12c-a4ee7042a86d',
        interface: {
          label: 'Willa Mattussevich',
          version: '4.21',
        },
      },
    },
    {
      _id: '301a9f17-6395-4169-9e0a-1027b3f2caba',
      isPreferred: false,
      isValid: true,
      paymentProvider: {
        _id: '540be5b9-1b15-4017-b434-33c5fe99291a',
        interface: {
          label: 'Nicole Bessant',
          version: '0.6.1',
        },
      },
    },
    {
      _id: '1d28a290-4a15-4e02-b1dc-1650432c7827',
      isPreferred: false,
      isValid: true,
      paymentProvider: {
        _id: '35c62cdd-dab9-451e-bf02-fc47c80b5832',
        interface: {
          label: 'Cornelia Dellenbrok',
          version: '6.9',
        },
      },
    },
    {
      _id: '34ea2b19-3d39-4310-96f8-2ce819fd8674',
      isPreferred: false,
      isValid: true,
      paymentProvider: {
        _id: '1eefc16b-f611-4d6c-bfd7-033082cb1e4e',
        interface: {
          label: 'Nisse Jirieck',
          version: '0.50',
        },
      },
    },
    {
      _id: '3eb7de25-a26c-4321-83be-4e556351d8c6',
      isPreferred: true,
      isValid: true,
      paymentProvider: {
        _id: 'eb4f43ea-e872-45de-b7da-22e3acbd277b',
        interface: {
          label: 'Petunia Klambt',
          version: '0.2.2',
        },
      },
    },
    {
      _id: '44095541-9934-4ffa-b77a-78326700bf3a',
      isPreferred: true,
      isValid: true,
      paymentProvider: {
        _id: '28f885dc-beb4-41af-b9a2-27a62f699a03',
        interface: {
          label: 'Sterling Aldis',
          version: '0.7.2',
        },
      },
    },
    {
      _id: '80a1cf32-d57f-4a0c-a93d-487d01f777aa',
      isPreferred: true,
      isValid: false,
      paymentProvider: {
        _id: '83955cdf-f3b5-42eb-a93b-68e99cbb5f4f',
        interface: {
          label: 'Betsy Ealden',
          version: '3.58',
        },
      },
    },
  ];
  return (
    <div className="my-8 flex w-full min-w-full flex-row flex-nowrap divide-y divide-slate-200 overflow-hidden rounded-lg shadow sm:bg-white">
      {paymentCredentialss?.length ? (
        <ul className="-my-5 divide-y w-full divide-slate-200">
          {(paymentCredentialss || []).map(
            ({
              _id: paymentCredentialsId,
              isPreferred,
              isActive,
              isValid,
              paymentProvider,
            }) => (
              <li className="py-4" key={paymentCredentialsId}>
                <div className=" flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <Link href={`/payment-provider/${paymentProvider._id}`}>
                      <a className="truncate text-sm font-medium text-blue-600">
                        {getInterfaceLabel(paymentProvider.interface)}
                      </a>
                    </Link>
                  </div>
                  <div>
                    {isPreferred && (
                      <p className="truncate text-sm text-slate-500">
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
