import { useIntl } from 'react-intl';
import Link from 'next/link';

import { getInterfaceLabel, useFormatPrice } from '../../common/utils/utils';
import useDeliveryProviderTypes from '../../delivery-provider/hooks/useDeliveryProviderTypes';
import useDeliveryStatusTypes from '../../delivery-provider/hooks/useDeliveryStatusTypes';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const OrderDetailDelivery = ({ delivery }) => {
  const { deliveryProviderType } = useDeliveryProviderTypes();

  const { deliveryStatusType } = useDeliveryStatusTypes();
  const { formatPrice } = useFormatPrice();
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const StatusInformation = ({ enumType, currentType, label }) => {
    return (
      <span
        title={label}
        className={`${
          currentType === enumType
            ? 'border-indigo-200 bg-indigo-100 text-indigo-800'
            : 'opacity-10'
        } mr-2 inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-sm `}
      >
        {enumType}
      </span>
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="flex items-center justify-between px-4 sm:px-6">
        <h2 className="py-4 text-lg font-medium">
          {formatMessage({
            id: 'delivery_information',
            defaultMessage: 'Delivery',
          })}
        </h2>
        {delivery?.delivered ? (
          <span className="font-medium">
            {formatDateTime(delivery?.delivered)}
          </span>
        ) : null}
      </div>
      <div className="border-t border-indigo-50 px-4 py-4 sm:px-6">
        <span className="mb-5 block">
          <Link href={`/delivery-provider/${delivery.provider._id}`}>
            <a className="font-medium text-blue-600 hover:text-blue-500">
              {getInterfaceLabel(delivery?.provider?.interface)}
            </a>
          </Link>
        </span>
        {delivery.fee ? (
          <>
            <div className="text-sm font-medium text-slate-500">
              {formatMessage({
                id: 'delivery_fee',
                defaultMessage: 'Fee',
              })}
            </div>
            <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
              {formatPrice(delivery.fee)}
            </span>
          </>
        ) : null}
        <div className="mt-3 text-sm font-medium text-slate-500">
          {formatMessage({
            id: 'method',
            defaultMessage: 'Method',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {deliveryProviderType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={delivery?.provider?.type}
              label={type.label}
            />
          ))}
        </span>

        <div className="mt-3 text-sm font-medium text-slate-500">
          {formatMessage({
            id: 'status',
            defaultMessage: 'Status',
          })}
        </div>
        <span className="mr-2 block rounded-full py-1 text-xs font-semibold leading-5">
          {deliveryStatusType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={delivery?.status}
              label={type.label}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
