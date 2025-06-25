import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import useLanguages from '../../language/hooks/useLanguages';
import useCountries from '../../country/hooks/useCountries';
import SearchField from './SearchField';
import TagInput from './TagInput';
import { normalizeQuery } from '../utils/utils';
import { isTruthy } from '../utils/normalizeFilterKeys';

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

const SearchWithTagsAndLocale = ({
  children,
  onSearchChange,
  defaultSearchValue,
  selectedLocale: externalSelectedLocale,
  onLocaleChange,
}) => {
  const { formatMessage } = useIntl();
  const { languages, loading } = useLanguages();
  const { countries } = useCountries();
  const { locale } = useIntl();
  const { query, push } = useRouter();

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

  const handleLocaleChange = (newLocale) => {
    setSelectedLocale(newLocale);
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    }
  };

  const handleTagChange = (value) => {
    if (isTruthy(value)) {
      push({
        query: normalizeQuery(query, value?.join(','), 'tags'),
      });
    } else {
      const { tags, ...rest } = query;
      push({
        query: normalizeQuery(rest),
      });
    }
  };

  return (
    <div>
      <div className="my-3 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        {/* Search Field */}
        <div className="flex flex-wrap gap-3">
          <div className="w-fit">
            <SearchField
              onInputChange={onSearchChange}
              defaultValue={defaultSearchValue}
            />
          </div>

          {/* Tag Input */}
          <div className="w-fit lg:border-l lg:border-slate-300 lg:dark:border-slate-700 lg:pl-3">
            <TagInput
              buttonText={formatMessage({
                id: 'apply',
                defaultMessage: 'Apply',
              })}
              tagList={(query?.tags as string)?.split(',')}
              onChange={handleTagChange}
            />
          </div>
        </div>

        {/* Locale Selector */}
        <div className="w-fit">
          <select
            id="locale-selector"
            className="cursor-pointer rounded-md border-1 border-slate-300 dark:border-slate-700 py-3 pr-8 px-4 text-sm text-black dark:text-white dark:bg-slate-800 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-slate-800 w-full lg:w-auto"
            value={selectedLocale}
            onChange={(e) => {
              e.stopPropagation();
              handleLocaleChange(e.target.value);
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

export default SearchWithTagsAndLocale;
