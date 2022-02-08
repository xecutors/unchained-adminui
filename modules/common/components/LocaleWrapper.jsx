import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleWrapper = ({ children }) => {
  const { languages } = useLanguages();
  const [selectedLocale, setSelectedLocale] = useState('de');
  const { formatMessage } = useIntl();

  return (
    <div>
      <select
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

      <div>{React.cloneElement(children, { selectedLocale })}</div>
    </div>
  );
};

export default LocaleWrapper;
