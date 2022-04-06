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
  readOnly,
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
      <div className="mt-6 shadow sm:max-w-full sm:rounded-lg">
        <div className="sm:px-15 bg-white px-4 pt-4 pb-6">
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
        <div className="border-t-indigo-50 border-t sm:px-15 space-y-6 bg-slate-50 p-6 px-5 text-right">
          <SubmitButton
            hidden={readOnly}
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
