import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const LanguageForm = ({ onSubmit, onSubmitSuccess, isEdit, defaultValue }) => {
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
        <TextField
          name="isoCode"
          id="isoCode"
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          autoComplete="on"
          required
          className="text-sm mt-2 block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        {isEdit && (
          <div className="flex items-center h-5">
            <CheckboxField
              id="isActive"
              name="isActive"
              label={formatMessage({
                id: 'active',
                defaultMessage: ' Active ',
              })}
              className="ml-3 focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300 rounded"
            />
          </div>
        )}
      </div>

      <SubmitButton
        label={
          isEdit
            ? formatMessage({ id: 'update', defaultMessage: 'Update' })
            : formatMessage({ id: 'add', defaultMessage: 'Add' })
        }
      />
    </Form>
  );
};

export default LanguageForm;
