import { useRouter } from 'next/router';

import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import ResetPasswordForm from '../modules/accounts/components/ResetPasswordForm';
import useResetPassword from '../modules/accounts/hooks/useResetPassword';
import { OnSubmitSuccessType } from '../modules/forms/hooks/useForm';

const PasswordReset = () => {
  const { query, push } = useRouter();
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const { token } = query;

  const onPasswordChangedSuccessfully: OnSubmitSuccessType = () => {
    toast.success(
      formatMessage({
        id: 'password_changed_success',
        defaultMessage: 'Password changed successfully.',
      }),
    );
    push('/');
    return true;
  };

  const onSubmit = async (variables) => {
    const { newPassword: newPlainPassword } = variables;
    const data = await resetPassword({
      newPlainPassword,
      token: token as string,
    });
    return { success: true, data };
  };

  return (
    <div className="flex min-h-screen justify-center bg-slate-100 dark:bg-slate-900 antialiased">
      <div className="container my-auto mt-24 max-w-md border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow rounded dark:shadow-none p-3 sm:mt-40">
        <div className="m-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-700 dark:text-slate-200">
            {formatMessage({
              id: 'reset_password',
              defaultMessage: 'Reset password',
            })}
          </h1>
          <p className="text-slate-500 dark:text-slate-300">
            {formatMessage({
              id: 'reset_password_header_description',
              defaultMessage:
                "Enter your new password and make sure you don't forget it this time.",
            })}
          </p>
        </div>
        <div className="p-2">
          <ResetPasswordForm
            onSubmit={onSubmit}
            onSubmitSuccess={onPasswordChangedSuccessfully}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

PasswordReset.getLayout = (page) => page;
