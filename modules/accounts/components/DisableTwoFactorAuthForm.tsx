import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useDisableTOTP from '../hooks/useDisableTOTP';

const DisableTwoFactorAuthForm = ({ userId }) => {
  const { disableTOTP } = useDisableTOTP();
  const { formatMessage } = useIntl();
  const onSubmit: OnSubmitType = async ({ code }) => {
    await disableTOTP({ code, userId });
    return { success: true };
  };
  const form = useForm({
    submit: onSubmit,
    initialValues: {
      code: '',
    },
    getSubmitErrorMessage: (error) => {
      if (error.message.includes("2FA code didn't match")) {
        form.formik.setFieldError(
          'code',
          formatMessage({
            id: 'totp_code_not_match',
            defaultMessage: 'TOTP code did not match',
          }),
        );
        return formatMessage({
          id: 'two_factor_code_not_match',
          defaultMessage: 'Two factor authentication code did not match',
        });
      }

      return '';
    },
  });

  return (
    <Form form={form}>
      <div className="relative max-w-full p-3 space-y-6 sm:p-6">
        <TextField
          label={formatMessage({
            id: 'totp_code',
            defaultMessage: 'TOTP code',
          })}
          placeholder={formatMessage({
            id: 'totp_code',
            defaultMessage: 'TOTP code',
          })}
          name="code"
          id="code"
          required
          className="mb-4 text-sm"
        />
      </div>
      <FormErrors />
      <div className="border-t-indigo-50 border-t dark:border-t-slate-700 space-y-6 bg-slate-50 dark:bg-slate-800 text-right sm:p-6">
        <SubmitButton
          label={formatMessage({
            id: 'disable_totp',
            defaultMessage: 'Disable TOTP',
          })}
        />
      </div>
    </Form>
  );
};

export default DisableTwoFactorAuthForm;
