import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { useIntl } from 'react-intl';
import { normalizeCurrencyISOCode } from '../../modules/common/utils/utils';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';

type Currency = {
  _id: string;
  isoCode: string;
  contractAddress: string | null;
  decimals: number;
  isActive: boolean;
  created: string;
};

export const CurrencyItemCompact = ({ currency }: { currency: Currency }) => {
  const { locale, formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-emerald-500">
        <BanknotesIcon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {normalizeCurrencyISOCode(locale, currency.isoCode)}
          </h3>
          <span
            className={`text-xs font-medium rounded-full px-2 py-0.5 ${
              currency.isActive
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
            }`}
          >
            {currency.isActive
              ? formatMessage({ id: 'active', defaultMessage: 'Active' })
              : formatMessage({
                  id: 'inactive',
                  defaultMessage: 'In-Active',
                })}
          </span>
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-300">
          {formatMessage({ id: 'decimals', defaultMessage: 'Decimals' })}:{' '}
          <span className="font-medium">{currency.decimals}</span>
        </div>

        {currency.contractAddress && (
          <div className="text-sm text-slate-700 dark:text-slate-300">
            {formatMessage({
              id: 'contract_address',
              defaultMessage: 'Contract Address',
            })}
            :<span className="font-mono">{currency.contractAddress}</span>
          </div>
        )}

        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'created', defaultMessage: 'Created' })}:{' '}
          {formatDateTime(currency.created)}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {currency._id}
        </div>
      </div>
    </div>
  );
};

const CopilotCurrencyList = ({ currencies }) => {
  if (!currencies?.length) return null;
  return (
    <div>
      {currencies.map((currency) => (
        <CurrencyItemCompact currency={currency} key={currency._id} />
      ))}
    </div>
  );
};

export default CopilotCurrencyList;
