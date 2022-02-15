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
      <div className="mt-6 sm:max-w-full  shadow sm:rounded-lg">
        <div className="bg-white pt-4 pb-6 px-4 sm:px-15">
          <SelectField
            onChange={(e) => onProviderChange(e.target.value)}
            name="type"
            required
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            options={providerTypes}
            className="mb-5"
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
        </div>
        <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
          <SubmitButton
            label={formatMessage({
              id: 'create_provider',
              defaultMessage: 'Create provider',
            })}
          />
        </div>
      </div>
    </Form>
  );
};

export default NewProviderForm;
