import { useIntl } from 'react-intl';
import Link from 'next/link';
import { Fragment } from 'react';

import Badge from '../../common/components/Badge';
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
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
          {deliveryProviderType.map((type, index) => (
            <Fragment key={index}>
              <StatusInformation
                enumType={type.value}
                currentType={delivery?.provider?.type}
                label={type.label}
              />
            </Fragment>
          ))}
        </span>
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
          {deliveryWrappingType.map((type, index) => (
            <Fragment key={index}>
              <StatusInformation
                enumType={type.value}
                currentType={delivery?.wrapping}
                label={type.label}
              />
            </Fragment>
          ))}
        </span>
        <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
          {deliveryStatusType.map((type, index) => (
            <Fragment key={index}>
              <StatusInformation
                enumType={type.value}
                currentType={delivery?.status}
                label={type.label}
              />
            </Fragment>
          ))}
        </span>
        {delivery.fee ? (
          <span className="block py-1 text-xs leading-5 font-semibold rounded-full mr-2">
            <Badge
              text={getCurrencyAndPrice(delivery.fee)}
              color="cyan"
              square
            />
          </span>
        ) : null}
        {delivery?.delivered ? (
          <span className="block py-1 text-xs leading-5 font-semibold rounded-full">
            <Badge
              text={formatDateTime(delivery?.delivered)}
              color="orange"
              square
            />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default OrderDetailDelivery;
