import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { normalizeLanguageISOCode } from '../../modules/common/utils/utils';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import getFlagEmoji from '../../modules/common/utils/getFlagEmoji';

type Language = {
  _id: string;
  isoCode: string;
  isActive: boolean;
  created: string;
};

export const LanguageItemCompact = ({ language }: { language: Language }) => {
  const { locale, formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const flag = getFlagEmoji(language.isoCode);

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-12 h-12 flex-shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-xl">
        {flag || <ChatBubbleLeftIcon className="w-6 h-6 text-blue-500" />}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            {normalizeLanguageISOCode(locale, language.isoCode)}
          </h3>
          <span
            className={`text-xs font-medium rounded-full px-2 py-0.5 ${
              language.isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {language.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'created', defaultMessage: 'Created' })}:{' '}
          {formatDateTime(language.created)}
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {language._id}
        </div>
      </div>
    </div>
  );
};

const CopilotLanguageList = ({ languages }) => {
  if (!languages?.length) return null;
  return (
    <div>
      {languages.map((language) => (
        <LanguageItemCompact key={language._id} language={language} />
      ))}
    </div>
  );
};

export default CopilotLanguageList;
