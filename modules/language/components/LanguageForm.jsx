import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const LanguageForm = ({ onSubmit, onSubmitSuccess, isEdit, defaultValue }) => {
  const { formatMessage } = useIntl();
  const languageAddedMessage = formatMessage({
    id: 'language_added',
    defaultMessage: 'Language added successfully!',
  });
  const languageUpdatedMessage = formatMessage({
    id: 'language_updated',
    defaultMessage: 'Language updated successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: isEdit ? languageUpdatedMessage : languageAddedMessage,
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  return (
    <Form form={form}>
      <div className="sm:max-w-full px-5 py-2">
        <TextField
          name="isoCode"
          id="isoCode"
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          autoComplete="on"
          required
          className="text-sm mt-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        {isEdit && (
          <div className="flex items-center h-5">
            <CheckboxField
              id="isActive"
              name="is-active"
              label={formatMessage({
                id: 'active',
                defaultMessage: 'Active',
              })}
              className="ml-3 focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300 rounded"
            />
          </div>
        )}
      </div>
      <div className="mt-5 px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
        <SubmitButton
          label={
            isEdit
              ? formatMessage({
                  id: 'update_language',
                  defaultMessage: 'Update Language',
                })
              : formatMessage({
                  id: 'add_language',
                  defaultMessage: 'Add Language',
                })
          }
        />
      </div>
    </Form>
  );
};

export default LanguageForm;
