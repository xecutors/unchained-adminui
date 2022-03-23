import React, { useState } from 'react';

import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleWrapper = ({ children }) => {
  const { languages } = useLanguages();
  const [selectedLocale, setSelectedLocale] = useState('de');
  const { formatMessage } = useIntl();

  return (
    <div className="mt-0 md:mt-5">
      <div className="relative ">
        <div className="absolute bottom-32 right-0 flex items-center lg:bottom-8">
          <select
            className="cursor-pointer rounded-md border-gray-300 py-[0.25rem] pr-8 text-sm lg:py-1 lg:pr-10"
            placeholder={formatMessage({
              id: 'select_language',
              defaultMessage: 'Select language',
            })}
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
