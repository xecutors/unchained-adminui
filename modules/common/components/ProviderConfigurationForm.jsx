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
      <FieldArray name="configuration">
        {({ push, remove: removeConfig }) => (
          <div>
            {values.configuration.map((p, index) => {
              return (
                <div key={p.key} className="flex justify-between">
                  <TextField
                    label="Key"
                    name={`configuration[${index}].key`}
                    required
                  />
                  <TextField
                    label="Value"
                    name={`configuration[${index}].value`}
                    required
                  />
                  <button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={() => removeConfig(index)}
                  >
                    x
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
              variant="outlined"
              onClick={() => push({ key: '', value: '' })}
            >
              Add
            </button>
          </div>
        )}
      </FieldArray>

      <SubmitButton
        label={formatMessage({
          id: 'update_provider',
          defaultMessage: 'Update provider',
        })}
        className="mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </Form>
  );
};

export default ProviderConfigurationForm;
