import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useIntl } from 'react-intl';
import {
  normalizeCountryISOCode,
  normalizeCurrencyISOCode,
} from '../../modules/common/utils/utils';
import getFlagEmoji from '../../modules/common/utils/getFlagEmoji';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';

type Country = {
  _id: string;
  isoCode: string;
  defaultCurrencyCode: string;
  isActive: boolean;
  created: string;
  updated: string;
};

export const CountryItemCompact = ({ country }: { country: Country }) => {
  const { formatMessage, locale } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const flag = getFlagEmoji(country.isoCode);
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-xl">
        {flag || <GlobeAltIcon className="w-6 h-6" />}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {normalizeCountryISOCode(locale, country.isoCode)}
          </h3>
          <span
            className={`text-xs font-medium rounded-full px-2 py-0.5 ${
              country.isActive
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
            }`}
          >
            {country.isActive
              ? formatMessage({ id: 'active', defaultMessage: 'Active' })
              : formatMessage({
                  id: 'inactive',
                  defaultMessage: 'In-Active',
                })}
          </span>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-300">
          {formatMessage({
            id: 'default_currency',
            defaultMessage: 'Default currency',
          })}
          :{' '}
          <span className="font-medium">
            {normalizeCurrencyISOCode(locale, country.defaultCurrencyCode)}
          </span>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({
            id: 'updated',
            defaultMessage: 'Updated',
          })}
          : {formatDateTime(country.updated)}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({
            id: 'id',
            defaultMessage: 'ID',
          })}
          : {country._id}
        </div>
      </div>
    </div>
  );
};

const CopilotCountryList = ({ countries }) => {
  if (!countries?.length) return null;
  return (
    <div>
      {countries.map((country) => (
        <CountryItemCompact country={country} key={country?._id} />
      ))}
      ;
    </div>
  );
};

export default CopilotCountryList;
