import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { validateLanguage } from '../../forms/lib/validators';

const LanguageForm = ({ onSubmit, onSubmitSuccess, isEdit, defaultValue }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
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
      if (error?.message?.includes('duplicate')) {
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
      <div className="p-5">
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
              className="mr-2 h-4 w-4 rounded-sm border-slate-300 text-indigo-500 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>
      <div className="border-t-indigo-50 border-t sm:px-15 mt-5 space-y-6 bg-slate-50 dark:bg-slate-500 p-5 text-right">
        <SubmitButton
          hidden={!hasRole(ACTION_ROLES.languages.update)}
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
