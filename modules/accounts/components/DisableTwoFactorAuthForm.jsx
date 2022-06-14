import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useDisableTOTP from '../hooks/useDisableTOTP';

const DisableTwoFactorAuthForm = ({ userId }) => {
  const { disableTOTP } = useDisableTOTP();
  const { formatMessage } = useIntl();
  const onSubmit = async ({ code }) => {
    await disableTOTP({ code, userId });
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
    <div className="overflow-hidden lg:flex">
      <div className="mb-7 border-slate-200 pb-2 sm:flex sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
          {formatMessage({
            id: 'disable_2fa_auth_header',
            defaultMessage: 'Disable 2FA authentication',
          })}
        </h3>
      </div>
      <div className="w-full border-b border-slate-200 bg-white dark:border-2 dark:bg-slate-600 rounded-md lg:ml-auto lg:w-4/6">
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
          <div className="border-t-indigo-50 border-t space-y-6 bg-slate-50 dark:bg-slate-500 text-right sm:p-6">
            <SubmitButton
              label={formatMessage({
                id: 'disable_totp',
                defaultMessage: 'Disable TOTP',
              })}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DisableTwoFactorAuthForm;
