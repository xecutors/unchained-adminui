import { useIntl } from 'react-intl';
import { useState } from 'react';

import TextAreaField from '../../forms/components/TextAreaField';

const ProviderConfigurationForm = ({ setConfiguration, defaultValue }) => {
  const { formatMessage } = useIntl();

  const [error, setError] = useState('');

  const handleChange = (event) => {
    try {
      JSON.parse(event.target.value);
      setError('');
    } catch (err) {
      setError(err);
    } finally {
      setConfiguration(event.target.value);
    }
  };

  const handleOnBlur = (event) => {
    try {
      const parsedConfiguration = JSON.parse(event.target.value);
      setConfiguration(JSON.stringify(parsedConfiguration, undefined, 2));
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <label
        htmlFor="configuration"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {formatMessage({
          id: 'configuration',
          defaultMessage: 'Configuration',
        })}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <TextAreaField
          id="configuration"
          name="configuration"
          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          value={defaultValue}
          onChange={handleChange}
          onBlur={handleOnBlur}
          rows={3}
        />
        {/* <textarea
          type="text"
          id="configuration"
          name="configuration"
          rows={3}
          className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          value={defaultValue}
          onChange={handleChange}
          onBlur={handleOnBlur}
        /> */}
        {error && (
          <p className="mt-2 text-sm text-red-500">
            {`${error.name} ${error.message}`}
          </p>
        )}
      </div>
    </>
  );
};

export default ProviderConfigurationForm;
