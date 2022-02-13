import React, { useState } from 'react';
import { TranslateIcon } from '@heroicons/react/outline';
import { useIntl } from 'react-intl';

import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleWrapper = ({ children }) => {
  const { languages } = useLanguages();
  const [selectedLocale, setSelectedLocale] = useState('de');
  const { formatMessage } = useIntl();

  return (
    <div className="mt-2">
      <div className="relative ">
        <div className="flex items-center absolute bottom-32 right-0 lg:bottom-5">
          <TranslateIcon className="w-5 h-5 lg:h-6 lg:w-6 z-5 absolute left-3 cursor-pointer text-indigo-500" />
          <select
            className="px-8 text-sm lg:px-10 cursor-pointer py-[0.25rem] lg:py-1 border-2 border-indigo-500 text-indigo-500 rounded-md"
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
