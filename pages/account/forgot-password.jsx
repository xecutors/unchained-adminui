import { useIntl } from 'react-intl';
import ForgotPasswordForm from '../../modules/accounts/components/ForgotPasswordForm';
import useForgotPassword from '../../modules/accounts/hooks/useForgotPassword';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const { formatMessage } = useIntl();
  const onSubmit = async ({ email }) => {
    await forgotPassword({ email });
    return true;
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
      <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
        <div className="text-center m-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {formatMessage({
              id: 'forgot_password',
              defaultMessage: 'Forgot your password?',
            })}
          </h1>
          <p className="text-gray-500">
            {formatMessage({
              id: 'forgot_password_header_description',
              defaultMessage:
                "Enter your email address below and we'll send you a link to reset your password!",
            })}
          </p>
        </div>

        <div className="p-2">
          <ForgotPasswordForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
