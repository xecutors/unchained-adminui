import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import useCountries from '../../country/hooks/useCountries';

const createLanguageDialectList = (languages, countries) => {
  const result = [];

  languages.forEach(({ _id: languageId, isoCode: baseIsoCode }) => {
    result.push({ _id: languageId, isoCode: baseIsoCode });
    countries.forEach(({ isoCode: countryIsoCode, _id: countryId }) => {
      const dialectIsoCode = `${baseIsoCode}-${countryIsoCode.toLowerCase()}`;
      result.push({
        _id: `${countryId}-${languageId}`,
        isoCode: dialectIsoCode,
      });
    });
  });

  return result;
};

const LocaleWrapper = ({
  children,
  selectedLocale: externalSelectedLocale = null,
}) => {
  const { languages, loading } = useLanguages();
  const { countries } = useCountries();
  const { locale } = useIntl();

  const [selectedLocale, setSelectedLocale] = useState(
    externalSelectedLocale || locale,
  );

  useEffect(() => {
    if (!loading) {
      const baseLanguage = languages
        .filter((l) => l.isBase || l.isoCode === locale)
        ?.map(({ isoCode }) => isoCode);
      const newLocale = baseLanguage.includes(locale)
        ? locale
        : baseLanguage[0];
      setSelectedLocale(externalSelectedLocale || newLocale);
    }
  }, [languages, loading, locale, externalSelectedLocale]);

  const languageDialectList = createLanguageDialectList(languages, countries);

  return (
    <div>
      <div className="my-3 flex justify-end">
        <div className="w-fit">
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
              return (
                <option key={language._id} value={language.isoCode}>
                  {language.isoCode}
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
