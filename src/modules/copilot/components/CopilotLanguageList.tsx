import React from 'react';
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { normalizeLanguageISOCode } from '../../common/utils/utils';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import getFlagEmoji from '../../common/utils/getFlagEmoji';
import Link from 'next/link';

export const LanguageItemCompact = ({ language }) => {
  const { locale, formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const flag = getFlagEmoji(language.isoCode);

  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-xl">
        {flag || <ChatBubbleLeftIcon className="w-6 h-6 text-blue-500" />}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
            {normalizeLanguageISOCode(locale, language.isoCode)}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                language.isActive
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
              }`}
            >
              {language.isActive
                ? formatMessage({ id: 'active', defaultMessage: 'Active' })
                : formatMessage({ id: 'inactive', defaultMessage: 'Inactive' })}
            </span>
            <Link
              href={`/language?languageId=${language._id}`}
              className="flex items-center text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              <PencilSquareIcon className="w-4 h-4 mr-1" />
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </Link>
          </div>
        </div>

        <div className="flex items-start justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-300">
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {formatMessage({ id: 'id', defaultMessage: 'ID' })}:{' '}
              {language._id}
            </div>
          </span>

          <div className="flex justify-end gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              {formatMessage({ id: 'created', defaultMessage: 'Created' })}:{' '}
              {formatDateTime(language.created)}
            </span>
            {language.updated && (
              <span>
                {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:{' '}
                {formatDateTime(language.updated)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CopilotLanguageList = ({ languages, toolCallId }) => {
  if (!languages?.length) return null;
  return (
    <div className="space-y-3">
      {languages.map((language) => (
        <LanguageItemCompact
          key={`${toolCallId}-${language._id}`}
          language={language}
        />
      ))}
    </div>
  );
};

export default CopilotLanguageList;
