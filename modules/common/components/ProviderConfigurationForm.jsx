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
    initialValues: {
      configuration: JSON.stringify(defaultValue || {}, null, 2),
    },
    submit: onSubmit,
    onSubmitSuccess,
  });

  return (
    <Form form={form}>
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <JSONAreaField
          id="configuration"
          name="configuration"
          label={formatMessage({
            id: 'configuration',
            defaultMessage: 'Configuration',
          })}
          className="block w-full max-w-lg rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
