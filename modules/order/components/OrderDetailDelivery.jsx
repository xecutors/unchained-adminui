import { useIntl } from 'react-intl';
import Link from 'next/link';

import {
  getCurrencyAndPrice,
  getInterfaceLabel,
  formatDateTime,
} from '../../common/utils/utils';
import useDeliveryProviderTypes from '../../delivery-provider/hooks/useDeliveryProviderTypes';
import useDeliveryWrappingTypes from '../../delivery-provider/hooks/useDeliveryWrappingTypes';
import useDeliveryStatusTypes from '../../delivery-provider/hooks/useDeliveryStatusTypes';

const OrderDetailDelivery = ({ delivery }) => {
  const { deliveryProviderType } = useDeliveryProviderTypes();
  const { deliveryWrappingType } = useDeliveryWrappingTypes();
  const { deliveryStatusType } = useDeliveryStatusTypes();

  const { formatMessage } = useIntl();

  const StatusInformation = ({ enumType, currentType, label }) => {
    return (
      <span
        title={label}
        className={`${
          currentType === enumType ? 'bg-teal-500 text-white' : ''
        } inline-flex items-center px-2 py-1 rounded-md border border-gray-300 bg-white text-xs font-normal mr-2`}
      >
        {enumType}
      </span>
    );
  };

  return (
    <div className="p-2 border border-gray-200 bg-gray-100 rounded-lg shadow-sm sm:flex-auto">
      <div className="font-medium text-gray-900 border-b pb-2 text-center">
        {formatMessage({
          id: 'delivery_information',
          defaultMessage: 'Delivery Information',
        })}
      </div>
      <div className="mt-3 text-gray-500">
        <span className="block">
          <Link href={`/delivery-provider/${delivery.provider._id}`}>
            <a className="text-blue-600 text-base font-bold">
              {getInterfaceLabel(delivery?.provider?.interface)}
            </a>
          </Link>
        </span>
        <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
          {formatMessage({
            id: 'delivery_provider',
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
        <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
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
        <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
          {formatMessage({
            id: 'delivery_status',
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
            <div className="pb-1 border border-x-0 border-t-0 border-gray-300 text-sm font-normal my-1">
              {formatMessage({
                id: 'delivery_fee',
                defaultMessage: 'Fee',
              })}
            </div>
            <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
              {getCurrencyAndPrice(delivery.fee)}
            </span>
          </>
        ) : null}
        {delivery?.delivered ? (
          <span className="block py-2 text-sm leading-5 font-bold">
            {formatDateTime(delivery?.delivered)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
