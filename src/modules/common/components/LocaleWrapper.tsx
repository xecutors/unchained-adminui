import React, { useEffect, useState } from 'react';

import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import useCountries from '../../country/hooks/useCountries';
import useShopInfo from '../hooks/useShopInfo';

const createLanguageDialectList = (languages, countries) => {
  const result = [];

  languages.forEach(({ _id: languageId, isoCode: baseIsoCode }) => {
    result.push({ _id: languageId, isoCode: baseIsoCode });
    countries.forEach(({ isoCode: countryIsoCode, _id: countryId }) => {
      const dialectIsoCode = `${baseIsoCode}-${countryIsoCode.toUpperCase()}`;
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
  onlyFull = false,
  searchComponent = null,
}) => {
  const { languages } = useLanguages();
  const { shopInfo, loading: shopInfoLoading } = useShopInfo();
  const { countries } = useCountries();
  const { locale } = useIntl();

  const [selectedLocale, setSelectedLocale] = useState(null);
  useEffect(() => {
    if (!shopInfoLoading) {
      const baseLanguage =
        shopInfo?.language?.isoCode +
        '-' +
        shopInfo?.country?.isoCode?.toUpperCase();
      setSelectedLocale(baseLanguage);
    }
  }, [shopInfo, shopInfoLoading, locale]);

  const languageDialectList = createLanguageDialectList(
    languages,
    countries,
  ).filter((l) => !onlyFull || l.isoCode.includes('-'));

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
