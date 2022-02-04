import React from 'react';
import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleSelector = ({ onChange }) => {
  const { languages } = useLanguages();
  const { NEXT_PUBLIC_DEFAULT_LOCALE } = process.env;

  const { formatMessage } = useIntl();

  return (
    <div className="pl-3 flex justify-end">
      <span className="mt-1  rounded-md shadow-sm">
        <div className="">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        </div>
      </span>
      <select
        className="text-center"
        placeholder={formatMessage({
          id: 'select_language',
          defaultMessage: 'Select language',
        })}
        defaultValue={NEXT_PUBLIC_DEFAULT_LOCALE}
        onChange={(e) => {
          stopPropagation(e);
          onChange(e.target.value);
        }}
      >
        <option value="">
          {formatMessage({
            id: 'select_language',
            defaultMessage: 'Select language',
          })}
        </option>
        {languages.map(({ isoCode, _id }) => (
          <option key={_id} value={isoCode}>
            {isoCode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;
