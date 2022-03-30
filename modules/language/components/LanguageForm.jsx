import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { validateLanguage } from '../../forms/lib/validators';

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
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('duplicate key')) {
        form.formik.setFieldError(
          'isoCode',
          formatMessage({
            id: 'language_exists',
            defaultMessage: 'Language with the same ISO code already exists',
          }),
        );
      }
    },
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      isActive: '',
      ...defaultValue,
    },
  });

  return (
    <Form form={form}>
      <div className="px-5 py-2">
        <TextField
          name="isoCode"
          id="isoCode"
          validators={[validateLanguage()]}
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          autoComplete="on"
          required
          className="my-2 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
        />

        {isEdit && (
          <div className="flex h-5 items-center">
            <CheckboxField
              id="isActive"
              name="isActive"
              type="checkbox"
              label={formatMessage({
                id: 'active',
                defaultMessage: ' Active',
              })}
              className="mr-2 h-4 w-4 rounded-sm border-gray-300 text-indigo-500 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>
      <div className="sm:px-15 mt-5 space-y-6 bg-gray-50 p-5 text-right">
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
