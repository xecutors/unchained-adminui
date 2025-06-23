import { useRouter } from 'next/router';

import { useIntl, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import ResetPasswordForm from '../modules/accounts/components/ResetPasswordForm';
import useValidateResetPasswordToken from '../modules/accounts/hooks/useValidateResetPasswordToken';
import useResetPassword from '../modules/accounts/hooks/useResetPassword';
import { OnSubmitSuccessType } from '../modules/forms/hooks/useForm';
import Link from 'next/link';
import Loading from '../modules/common/components/Loading';
import BlockingContent from '../modules/common/components/BlockingContent';

const PasswordReset = () => {
  const { query, push } = useRouter();
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const { token } = query;

  const { isValid, loading } = useValidateResetPasswordToken({
    token,
  });
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
  if (loading || typeof isValid !== 'boolean') return <Loading />;

  return !isValid ? (
    <BlockingContent>
      <h1 className="text-red-500 text-center font-extrabold text-2xl">
        Token invalid/expired
      </h1>
      <FormattedMessage
        tagName="dl"
        id="reset_token_invalid_warning"
        defaultMessage="The reset token is either invalid or expired. Please use
          the last reset link sent in your email or
          start the process again by going to {link}"
        values={{
          dl: (chunks) => <dl>{chunks}</dl>,
          dt: (chunks) => <dt>{chunks}</dt>,
          dd: (chunks) => <dd>{chunks}</dd>,
          link: (
            <Link
              href="/account/forgot-password"
              className="text-base font-medium text-slate-950 dark:text-slate-800 hover:text-slate-900 dark:hover:text-slate-400"
            >
              {formatMessage({
                id: 'forget_password',
                defaultMessage: 'Forgot your password?',
              })}
            </Link>
          ),
        }}
      />
      <Link
        href="/"
        className="m-auto group relative flex justify-center rounded-md border border-transparent bg-slate-800 dark:bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-950 dark:hover:bg-slate-500 focus:outline-hidden focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:ring-offset-2"
      >
        {formatMessage({
          id: 'go-home',
          defaultMessage: 'Go back home',
        })}
      </Link>
    </BlockingContent>
  ) : (
    <div className="flex min-h-screen justify-center bg-slate-50 dark:bg-slate-900 antialiased">
      <div className="container my-auto mt-24 max-w-md border-1 border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-sm dark:shadow-none p-3 sm:mt-40">
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
