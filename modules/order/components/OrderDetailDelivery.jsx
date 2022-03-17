import { useIntl } from 'react-intl';
import Link from 'next/link';

import { getInterfaceLabel, useFormatPrice } from '../../common/utils/utils';
import useDeliveryProviderTypes from '../../delivery-provider/hooks/useDeliveryProviderTypes';
import useDeliveryWrappingTypes from '../../delivery-provider/hooks/useDeliveryWrappingTypes';
import useDeliveryStatusTypes from '../../delivery-provider/hooks/useDeliveryStatusTypes';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const OrderDetailDelivery = ({ delivery }) => {
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { deliveryWrappingType } = useDeliveryWrappingTypes();
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
            ? 'bg-teal-500 text-white border-teal-700'
            : 'opacity-25'
        } inline-flex items-center px-2 py-1 rounded-md border border-gray-300 bg-white text-xs font-normal mr-2`}
      >
        {enumType}
      </span>
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <h2 className="px-4 py-5 sm:px-6 text-lg font-medium text-gray-900">
        {formatMessage({
          id: 'delivery_information',
          defaultMessage: 'Delivery Information',
        })}
      </h2>
      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <span className="block mb-5">
          <Link href={`/delivery-provider/${delivery.provider._id}`}>
            <a className="font-medium text-blue-600 hover:text-blue-500">
              {getInterfaceLabel(delivery?.provider?.interface)}
            </a>
          </Link>
        </span>
        <div className="text-sm font-medium text-gray-500 mt-3">
          {formatMessage({
            id: 'provider',
            defaultMessage: 'Provider',
          })}
        </div>
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
          {deliveryProviderType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={delivery?.provider?.type}
              label={type.label}
            />
          ))}
        </span>
        <div className="text-sm font-medium text-gray-500 mt-3">
          {formatMessage({
            id: 'wrapping_condition',
            defaultMessage: 'Wrapping condition',
          })}
        </div>
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
          {deliveryWrappingType.map((type) => (
            <StatusInformation
              key={type.value}
              enumType={type.value}
              currentType={delivery?.wrapping}
              label={type.label}
            />
          ))}
        </span>
        <div className="text-sm font-medium text-gray-500 mt-3">
          {formatMessage({
            id: 'status',
            defaultMessage: 'Status',
          })}
        </div>
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
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
            <div className="text-sm font-medium text-gray-500 mt-3">
              {formatMessage({
                id: 'delivery_fee',
                defaultMessage: 'Fee',
              })}
            </div>
            <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {formatPrice(delivery.fee)}
            </span>
          </>
        ) : null}
        {delivery?.delivered ? (
          <span className="mt-3 block py-2 text-sm leading-5 font-bold">
            {formatDateTime(delivery?.delivered)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
