import React from 'react';
import { GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useIntl } from 'react-intl';
import {
  normalizeCountryISOCode,
  normalizeCurrencyISOCode,
} from '../../common/utils/utils';
import getFlagEmoji from '../../common/utils/getFlagEmoji';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import Link from 'next/link';

export const CountryItemCompact = ({ country }) => {
  const { formatMessage, locale } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const flag = getFlagEmoji(country.isoCode);

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-xl">
        {flag || <GlobeAltIcon className="w-6 h-6" />}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
            {normalizeCountryISOCode(locale, country.isoCode)}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
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
            <Link
              href={`/country?countryId=${country._id}`}
              className="flex items-center text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              <PencilSquareIcon className="w-4 h-4 mr-1" />
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </Link>
          </div>
        </div>

        <div className="flex items-start justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-300">
            {formatMessage({
              id: 'default_currency',
              defaultMessage: 'Default currency',
            })}
            :{' '}
            <span className="font-medium">
              {normalizeCurrencyISOCode(locale, country.defaultCurrencyCode)}
            </span>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {country._id}
            </div>
          </span>

          <div className="flex justify-end gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              {formatMessage({ id: 'created', defaultMessage: 'Created' })}:{' '}
              {formatDateTime(country.created)}
            </span>
            {country.updated && (
              <span>
                {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:{' '}
                {formatDateTime(country.updated)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CopilotCountryList = ({ countries, toolCallId }) => {
  if (!countries?.length) return null;
  return (
    <div className="space-y-3">
      {countries.map((country) => (
        <CountryItemCompact
          country={country}
          key={`${toolCallId}-${country?._id}`}
        />
      ))}
    </div>
  );
};

export default CopilotCountryList;
