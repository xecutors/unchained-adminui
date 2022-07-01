import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { stopPropagation } from '../data/miscellaneous';

const LocaleSwitcher = () => {
  const { formatMessage } = useIntl();
  const { pathname, asPath, query, push, locale, locales } = useRouter();

  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleOnChange = (e) => {
    stopPropagation(e);
    setSelectedLocale(e.target.value);
    push({ pathname, query }, asPath, {
      locale: e.target.value,
    });
  };

  return (
    <div className="absolute top-16 right-16 sm:right-20 md:right-24 md:top-8">
      <select
        className="cursor-pointer rounded-md border-slate-300 py-[0.25rem] pr-8 text-sm lg:py-1 lg:pr-10 text-black dark:text-white  dark:bg-slate-400"
        placeholder={formatMessage({
          id: 'select_language',
          defaultMessage: 'Select language',
        })}
        value={selectedLocale}
        onChange={handleOnChange}
      >
        {locales.map((language) => (
          <option key={language} value={language}>
            {new Intl.DisplayNames(['en'], {
              type: 'language',
            }).of(language)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
