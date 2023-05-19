import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import getConfig from 'next/config';
import ForgotPasswordForm from '../../modules/accounts/components/ForgotPasswordForm';
import useForgotPassword from '../../modules/accounts/hooks/useForgotPassword';
import ImageWithFallback from '../../modules/common/components/ImageWithFallback';

const {
  publicRuntimeConfig: { logo },
} = getConfig();

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();

  const { formatMessage } = useIntl();

  const onSubmitSuccess = (success, { email }) => {
    if (success) {
      toast.success(
        formatMessage(
          {
            id: 'reset_link_sent',
            defaultMessage: 'Password reset link sent to {email} ',
          },
          {
            email,
          },
        ),
      );
    }
  };
  const onSubmit = async ({ email }) => {
    const { data } = await forgotPassword({ email });
    return data.forgotPassword;
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <ImageWithFallback
            className="mx-auto"
            src={logo}
            width={160}
            height={100}
            alt={formatMessage({
              id: 'unchained_logo',
              defaultMessage: 'Unchained Logo',
            })}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">
            {formatMessage({
              id: 'forgot_password',
              defaultMessage: 'Forgot your password?',
            })}
          </h2>
        </div>
        <ForgotPasswordForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
