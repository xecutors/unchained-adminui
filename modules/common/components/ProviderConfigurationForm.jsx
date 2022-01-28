import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';

import useForm from '../../forms/hooks/useForm';

const ProviderConfigurationForm = ({
  onSubmit,
  onSubmitSuccess,
  defaultValue,
}) => {
  const { formatMessage } = useIntl();
  const providerUpdatedMessage = formatMessage({
    id: 'provider_updated',
    defaultMessage: 'Provider updated successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: providerUpdatedMessage,
    enableReinitialize: true,
    initialValues: {
      configuration: [{ key: '', value: '', ...defaultValue }],
    },
  });

 
  const { values } = form.formik;

  return (
    <Form form={form}>
      <FieldArray name="configuration">
        {({ push, remove: removeConfig }) => (
          <div>
            {values.configuration.map((p, index) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="flex justify-between align-baseline"
                >
                  <TextField
                    placeholder="Key"
                    name={`configuration[${index}].key`}
                    id={`configuration[${index}].key`}
                    required
                    label={formatMessage({
                      id: 'configuration_key',
                      defaultMessage: 'Configuration key',
                    })}
                    hideLabel
                    className="w-full mr-2"
                  />
                  <TextField
                    placeholder="Value"
                    name={`configuration[${index}].value`}
                    id={`configuration[${index}].value`}
                    required
                    label={formatMessage({
                      id: 'configuration_value',
                      defaultMessage: 'Configuration value',
                    })}
                    hideLabel
                    className="w-full mr-2"
                  />
                  <div className="flex-shrink-0 sm:mt-4 mt-5 mr-1">
                    <button
                      className="items-center px-1 py-1 border shadow-sm text-sm rounded-full text-red-500 bg-white border-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
                      type="button"
                      onClick={() => removeConfig(index)}
                    >
                      <svg
                        className=" h-4 w-4 text-white-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {' '}
                        <polyline points="3 6 5 6 21 6" />{' '}
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                        <line x1="10" y1="11" x2="10" y2="17" />{' '}
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className=" " />
              <div className=" mt-2 flex-shrink-0">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-right px-2 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    variant="outlined"
                    onClick={() =>
                      push({ id: Math.random(), key: '', value: '' })
                    }
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </FieldArray>

      <SubmitButton
        label={formatMessage({
          id: 'update_provider',
          defaultMessage: 'Update provider',
        })}
        third
      />
    </Form>
  );
};

export default ProviderConfigurationForm;
