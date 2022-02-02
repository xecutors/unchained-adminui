import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import useLanguages from '../../language/hooks/useLanguages';
import { stopPropagation } from '../data/miscellaneous';

const LocaleWrapper = ({ children }) => {
  const { languages } = useLanguages();
  const [selectedLocale, setSelectedLocale] = useState({});
  const { formatMessage } = useIntl();

  return (
    <div>
      <select
        placeholder={formatMessage({
          id: 'select_language',
          defaultMessage: 'Select language',
        })}
        defaultValue=""
        onChange={(e) => {
          stopPropagation(e);
          setSelectedLocale(languages?.find((l) => e.target.value === l._id));
        }}
      >
        <option value="">
          {formatMessage({
            id: 'select_language',
            defaultMessage: 'Select language',
          })}
        </option>
        {languages.map((language) => (
          <option key={language._id} value={language._id}>
            {language.isoCode}
          </option>
        ))}
      </select>

      <div>{React.cloneElement(children, { selectedLocale })}</div>
    </div>
  );
};

export default LocaleWrapper;
