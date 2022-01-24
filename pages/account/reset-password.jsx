import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import ResetPasswordForm from '../../modules/accounts/components/ResetPasswordForm';
import useResetPassword from '../../modules/accounts/hooks/useResetPassword';

const PasswordReset = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const { token } = query;

  const onSubmit = async ({ newPassword }) => {
    await resetPassword({ newPassword, token });
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
      <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
        <div className="text-center m-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {formatMessage({
              id: 'reset_password',
              defaultMessage: 'Reset password',
            })}
          </h1>
          <p className="text-gray-500">
            {formatMessage({
              id: 'forgot_password_header_description',
              defaultMessage:
                "Enter your new password and make sure you don't forget it this time.",
            })}
          </p>
        </div>
        <div className="p-2">
          <ResetPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;

PasswordReset.getLayout = (page) => page;
