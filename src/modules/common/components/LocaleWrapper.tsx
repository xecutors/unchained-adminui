import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import useCountries from '../../country/hooks/useCountries';

const createLanguageDialectList = (languages, countries) => {
  const result = [];

  languages.forEach(({ _id: languageId, isoCode: baseIsoCode }) => {
    result.push({ _id: languageId, isoCode: baseIsoCode });
    countries.forEach(({ isoCode: countryIsoCode, _id: countryId }) => {
      const dialectIsoCode = `${baseIsoCode}_${countryIsoCode.toLowerCase()}`;
      result.push({
        _id: `${countryId}-${languageId}`,
        isoCode: dialectIsoCode,
      });
    });
  });

  return result;
};

const LocaleWrapper = ({ children, searchComponent = null }) => {
  const { languages, loading } = useLanguages();
  const { countries } = useCountries();
  const { locale } = useIntl();

  const [selectedLocale, setSelectedLocale] = useState(locale);

  useEffect(() => {
    if (!loading) {
      const baseLanguage = languages
        .filter((l) => l.isBase || l.isoCode === locale)
        ?.map(({ isoCode }) => isoCode);
      setSelectedLocale(
        baseLanguage.includes(locale) ? locale : baseLanguage[0],
      );
    }
  }, [languages, loading, locale]);

  const languageDialectList = createLanguageDialectList(languages, countries);

  return (
    <div>
      <div className="mt-5 flex justify-between items-center flex-wrap gap-3">
        {searchComponent && <div>{searchComponent}</div>}
        <div className="w-fit mt-5">
          <select
            id="locale-wrapper"
            className="cursor-pointer rounded-md border-1 border-slate-300 dark:border-slate-700 py-1 pr-8 text-sm lg:py-1 lg:pr-10 text-black dark:text-white dark:bg-slate-800 shadow-xs  focus:outline-hidden focus:ring-2 focus:ring-slate-800"
            value={selectedLocale}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedLocale(e.target.value);
            }}
          >
            {languageDialectList?.map((language) => {
              const displayName = (() => {
                try {
                  return (
                    new Intl.DisplayNames([selectedLocale], {
                      type: 'language',
                    }).of(language.isoCode) || language.isoCode
                  );
                } catch {
                  return language.isoCode;
                }
              })();

              return (
                <option key={language._id} value={language.isoCode}>
                  {displayName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>{React.cloneElement(children, { selectedLocale })}</div>
    </div>
  );
};

export default LocaleWrapper;
