import { useRouter } from 'next/router';

import { useIntl, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import ResetPasswordForm from '../modules/accounts/components/ResetPasswordForm';
import { useValidateResetPasswordToken } from '../modules/accounts/hooks/useValidateResetPasswordToken';
import useResetPassword from '../modules/accounts/hooks/useResetPassword';
import { OnSubmitSuccessType } from '../modules/forms/hooks/useForm';
import Link from 'next/link';
import Loading from '../modules/common/components/Loading';

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
    <>
      <div className="modal-overlay d-block" aria-hidden="false" />
      <div className="modal d-block box-shadow p-2 p-lg-3">
        <h2 className="text-center">Token ungültig / abgelaufen</h2>
        <FormattedMessage
          tagName="dl"
          id="reset_token_invalid_warning"
          defaultMessage=" Der Reset-Token ist entweder ungültig oder abgelaufen. Bitte verwenden
            Sie den zuletzt in Ihrer E-Mail gesendeten Link zum Zurücksetzen oder
            starten Sie den Vorgang erneut, indem Sie auf {link} gehen"
          values={{
            dl: (chunks) => <dl>{chunks}</dl>,
            dt: (chunks) => <dt>{chunks}</dt>,
            dd: (chunks) => <dd>{chunks}</dd>,
            link: (
              <Link href="/account/forgot-password" className="link">
                {formatMessage({
                  id: 'forgot-password-form',
                  defaultMessage: 'Formular „Passwort vergessen“.',
                })}
              </Link>
            ),
          }}
        />
        <Link href="/" className="px-4 py-2 button button--primary ">
          {formatMessage({
            id: 'go-home',
            defaultMessage: 'Zur Startseite',
          })}
        </Link>
      </div>
    </>
  ) : (
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
