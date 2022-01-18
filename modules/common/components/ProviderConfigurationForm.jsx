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
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      configuration: [...defaultValue],
    },
  });

  const { formatMessage } = useIntl();
  const { values } = form.formik;

  return (
  
    <Form form={form}>
      <div className="  mb-1 min-w-0 flex-1 sm:max-w-lg">
        <div className="bg-white py-12 px-10 shadow sm:rounded-b sm:px-15">
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
                        // label={formatMessage({
                        //   id: 'key',
                        //   defaultMessage: 'Key',
                        //   description:
                        //     'Providers configuration setting key field label',
                        // })}
                        label=""
                        name={`configuration[${index}].key`}
                        id={`configuration[${index}].key`}
                        required
                      />
                      <TextField
                        // label={formatMessage({
                        //   id: 'value',
                        //   defaultMessage: 'Value',
                        //   description:
                        //     'Providers configuration setting value field label',
                        // })}
                        label=""
                        name={`configuration[${index}].value`}
                        id={`configuration[${index}].value`}
                        required
                      />
                      <button
                        className="text-red-500 align-baseline"
                        type="button"
                        onClick={() => removeConfig(index)}
                      >
                        x
                      </button>
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
            className="mt-5 ml-2 mr-2  items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </Form>
  );
};

export default ProviderConfigurationForm;
