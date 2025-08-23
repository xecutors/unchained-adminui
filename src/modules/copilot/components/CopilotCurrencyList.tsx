import React from 'react';
import { BanknotesIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { normalizeCurrencyISOCode } from '../../common/utils/utils';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

export const CurrencyItemCompact = ({ currency }) => {
  const { locale, formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const decimals = currency.decimals ?? 2;

  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-10 h-10 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-emerald-500">
        <BanknotesIcon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
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
              : formatMessage({ id: 'inactive', defaultMessage: 'In-Active' })}
          </span>
        </div>

        <div className="text-xs text-slate-700 dark:text-slate-300">
          {formatMessage({ id: 'decimals', defaultMessage: 'Decimals' })}:{' '}
          <span className="font-medium">{decimals}</span>
        </div>

        {currency.contractAddress && (
          <div
            className="text-xs text-slate-700 dark:text-slate-300 truncate"
            title={currency.contractAddress}
          >
            {formatMessage({
              id: 'contract_address',
              defaultMessage: 'Contract Address',
            })}
            : <span className="font-mono">{currency.contractAddress}</span>
          </div>
        )}

        <div className="flex justify-end gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            {formatMessage({ id: 'created', defaultMessage: 'Created' })}:{' '}
            {formatDateTime(currency.created)}
          </span>
          {currency.updated && (
            <span>
              {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:{' '}
              {formatDateTime(currency.updated)}
            </span>
          )}
        </div>
      </div>

      <Link
        href={`/currency?currencyId=${currency._id}`}
        className="flex items-center text-xs text-blue-600 hover:underline dark:text-blue-400"
      >
        <PencilSquareIcon className="w-4 h-4 mr-1" />
        {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
      </Link>
    </div>
  );
};

const CopilotCurrencyList = ({
  currencies,
  toolCallId,
}: {
  currencies: any[];
  toolCallId: string;
}) => {
  if (!currencies?.length) return null;
  return (
    <div className="space-y-2">
      {currencies.map((currency) => (
        <CurrencyItemCompact
          currency={currency}
          key={`${toolCallId}-${currency._id}`}
        />
      ))}
    </div>
  );
};

export default CopilotCurrencyList;
