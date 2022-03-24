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
            ? 'border-teal-700 bg-teal-500 text-white'
            : 'opacity-25'
        } mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-normal`}
      >
        {enumType}
      </span>
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <h2 className="px-4 py-5 text-lg font-medium text-gray-900 sm:px-6">
        {formatMessage({
          id: 'delivery_information',
          defaultMessage: 'Delivery Information',
        })}
      </h2>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <span className="mb-5 block">
          <Link href={`/delivery-provider/${delivery.provider._id}`}>
            <a className="font-medium text-blue-600 hover:text-blue-500">
              {getInterfaceLabel(delivery?.provider?.interface)}
            </a>
          </Link>
        </span>
        <div className="mt-3 text-sm font-medium text-gray-500">
          {formatMessage({
            id: 'provider',
            defaultMessage: 'Provider',
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

        <div className="mt-3 text-sm font-medium text-gray-500">
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
        {delivery.fee ? (
          <>
            <div className="mt-3 text-sm font-medium text-gray-500">
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
        {delivery?.delivered ? (
          <span className="mt-3 block py-2 text-sm font-bold leading-5">
            {formatDateTime(delivery?.delivered)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
