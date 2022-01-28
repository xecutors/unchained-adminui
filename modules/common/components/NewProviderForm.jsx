import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

const NewProviderForm = ({
  onSubmit,
  onSubmitSuccess,
  providerTypes,
  providerInterfaces,
  onProviderChange,
}) => {
  const { formatMessage } = useIntl();

  const createProviderMessage = formatMessage({
    id: 'provider_created_success',
    defaultMessage: 'Provider created successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: createProviderMessage,
    enableReinitialize: true,
    initialValues: {
      adapterKey: '',
      type: '',
    },
  });

  return (
    <Form form={form}>
      <div className="mt-6 sm:max-w-full">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-15">
          <SelectField
            onChange={(e) => onProviderChange(e.target.value)}
            name="type"
            required
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            options={providerTypes}
            className="mb-2"
          />
          <SelectField
            name="adapterKey"
            required
            options={providerInterfaces}
            label={formatMessage({ id: 'adapter', defaultMessage: 'Adapter' })}
            placeholder={formatMessage({
              id: 'adapter',
              defaultMessage: 'Adapter',
            })}
            className="mt-2"
          />
          <SubmitButton
            label={formatMessage({
              id: 'create_provider',
              defaultMessage: 'Create provider',
            })}
            third
          />
        </div>
      </div>
    </Form>
  );
};

export default NewProviderForm;
