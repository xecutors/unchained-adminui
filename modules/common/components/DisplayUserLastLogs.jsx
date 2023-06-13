import { useIntl } from 'react-intl';
import useFormatDateTime from '../utils/useFormatDateTime';

import {
  normalizeCountryISOCode,
  normalizeLanguageISOCode,
} from '../utils/utils';

const LoginInfo = ({ loginData }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="mt-2 bg-white text-slate-500 dark:text-slate-200">
      <div>
        <label className="text-sm font-medium ">
          {formatMessage({ id: 'country', defaultMessage: 'Country' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">
            {normalizeCountryISOCode(loginData.countryCode)}
          </span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'language', defaultMessage: 'Language' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">
            {normalizeLanguageISOCode(loginData.locale?.split('_')[0])}
          </span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'browser', defaultMessage: 'Browser' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{loginData.userAgent}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'ip', defaultMessage: 'IP Address' })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{loginData.remoteAddress}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'time', defaultMessage: 'Time' })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">
            {loginData.timestamp
              ? formatDateTime(loginData.timestamp, {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })
              : 'n/a'}
          </span>
        </div>
      </div>
    </div>
  );
};

const BillingAddressInfo = ({
  firstName,
  lastName,
  company,
  addressLine,
  addressLine2,
  postalCode,
  countryCode,
  regionCode,
  city,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt-2 bg-white text-slate-500 dark:text-slate-200">
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'fullName', defaultMessage: 'FullName' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{firstName}</span>
          <span className="flex-grow">{lastName}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'company', defaultMessage: 'Company' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{company}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'address', defaultMessage: 'Address' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{addressLine}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'address2', defaultMessage: 'Address 2' })}
        </label>

        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{addressLine2}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({
            id: 'postal_code',
            defaultMessage: 'Postal/ZIP code',
          })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{postalCode}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'country', defaultMessage: 'Country' })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">
            {normalizeCountryISOCode(countryCode)}
          </span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'city', defaultMessage: 'City' })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{city}</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-500 dark:text-slate-200">
          {formatMessage({ id: 'region', defaultMessage: 'Region' })}
        </label>
        <div className="flex text-sm text-slate-900 dark:text-slate-200 sm:col-span-2 sm:mt-0">
          <span className="flex-grow">{regionCode}</span>
        </div>
      </div>
    </div>
  );
};

const DisplayUserLastLogs = ({
  lastBillingAddress,
  lastContact,
  lastLogin,
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <LoginInfo loginData={lastLogin} />
      </div>
      <div className="row">
        <BillingAddressInfo {...lastBillingAddress} />
      </div>
    </div>
  );
};

export default DisplayUserLastLogs;
