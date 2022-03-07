import { useIntl } from 'react-intl';

import JSONAreaField from '../../forms/components/JSONAreaField';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import Form from '../../forms/components/Form';

const ProviderConfigurationForm = ({
  onSubmit,
  onSubmitSuccess,
  defaultValue,
}) => {
  const { formatMessage } = useIntl();
  const form = useForm({
    initialValues: { configuration: JSON.stringify(defaultValue || {}) },
    submit: onSubmit,
    onSubmitSuccess,
  });

  return (
    <Form form={form}>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <JSONAreaField
          id="configuration"
          name="configuration"
          label={formatMessage({
            id: 'configuration',
            defaultMessage: 'Configuration',
          })}
          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          value={defaultValue}
          rows={3}
        />
        <FormErrors />
        <SubmitButton />
      </div>
    </Form>
  );
};

export default ProviderConfigurationForm;
