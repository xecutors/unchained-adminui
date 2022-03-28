import { useIntl } from 'react-intl';

import JSONAreaField from '../../forms/components/JSONAreaField';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import Form from '../../forms/components/Form';

const ProviderConfigurationForm = ({ onSubmit, onSubmitSuccess, provider }) => {
  const { formatMessage } = useIntl();
  const form = useForm({
    initialValues: {
      configuration: JSON.stringify(provider?.configuration || {}, null, 2),
    },
    submit: onSubmit,
    onSubmitSuccess,
  });
  return (
    <Form form={form} className="mt-6">
      <label
        htmlFor="configuration"
        className="block text-sm font-medium text-gray-400 sm:mt-px sm:pt-2"
      >
        {formatMessage({
          id: 'configuration',
          defaultMessage: 'Configuration',
        })}
      </label>
      <div className="mt-1 sm:mt-0">
        <JSONAreaField
          id="configuration"
          name="configuration"
          value={form.formik.values.configuration}
          label={formatMessage({
            id: 'configuration',
            defaultMessage: 'Configuration',
          })}
          hideLabel
        />
        <FormErrors />
        <SubmitButton
          label={formatMessage({
            id: 'update_configuration',
            defaultMessage: 'Update configuration',
          })}
          className="my-2"
        />
      </div>
    </Form>
  );
};

export default ProviderConfigurationForm;
