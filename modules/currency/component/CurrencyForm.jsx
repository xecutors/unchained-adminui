import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const CurrencyForm = ({ onSubmit, onSubmitSuccess, defaultValue = {} }) => {
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  const { formatMessage } = useIntl();

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <TextField
            name="isoCode"
            id="isoCode"
            label={formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO Code',
            })}
            autoComplete="on"
            required
            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center h-5">
          <CheckboxField
            id="isActive"
            name="isActive"
            label={formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
            className="m-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
      </div>

      <SubmitButton
        label="Add"
        className="mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </Form>
  );
};

export default CurrencyForm;
