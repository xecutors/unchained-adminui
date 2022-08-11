import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleWrapper = ({ children }) => {
  const { languages, loading } = useLanguages();
  const { formatMessage, locale } = useIntl();

  const [selectedLocale, setSelectedLocale] = useState(locale);

  useEffect(() => {
    if (!loading) {
      const baseLanguage = languages
        .filter((l) => l.isBase || l.isoCode === locale)
        .map(({ isoCode }) => isoCode);
      setSelectedLocale(
        baseLanguage.includes(locale) ? locale : baseLanguage[0],
      );
    }
  }, [languages, loading, locale]);

  return (
    <div className="my-3">
      <div className="relative mb-2">
        <div className="w-fit ml-auto">
          <select
            id="locale-wrapper"
            className="cursor-pointer rounded-md border-slate-300 dark:border-slate-700 py-[0.25rem] pr-8 text-sm lg:py-1 lg:pr-10 text-black dark:text-slate-400 dark:bg-slate-800"
            placeholder={formatMessage({
              id: 'select_language',
              defaultMessage: 'Select language',
            })}
            value={selectedLocale}
            defaultValue={selectedLocale}
            onChange={(e) => {
              stopPropagation(e);
              setSelectedLocale(e.target.value);
            }}
          >
            {languages.map((language) => (
              <option key={language._id} value={language.isoCode}>
                {language.isoCode}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>{React.cloneElement(children, { selectedLocale })}</div>
    </div>
  );
};

export default LocaleWrapper;
