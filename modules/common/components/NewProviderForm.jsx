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

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      adapterKey: '',
      type: '',
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5" />
      <SelectField
        onChange={(e) => onProviderChange(e.target.value)}
        name="type"
        required
        label={formatMessage({ id: 'type', defaultMessage: 'type' })}
        options={providerTypes}
      />
      <SelectField
        name="adapterKey"
        required
        options={providerInterfaces}
        label={formatMessage({ id: 'adapter', defaultMessage: 'Adapter' })}
      />
      <SubmitButton
        className=" mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        label={formatMessage({
          id: 'create_provider',
          defaultMessage: 'Create provider',
        })}
      />
    </Form>
  );
};

export default NewProviderForm;
