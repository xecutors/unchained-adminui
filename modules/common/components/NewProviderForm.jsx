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
      <div className="mt-6  sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-15">
          <SelectField
            onChange={(e) => onProviderChange(e.target.value)}
            name="type"
            required
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            options={providerTypes}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          <SelectField
            name="adapterKey"
            required
            options={providerInterfaces}
            label={formatMessage({ id: 'adapter', defaultMessage: 'Adapter' })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          <SubmitButton
            className="mt-3 ml-4  items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
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
