import Image from 'next/image';
import { useIntl } from 'react-intl';
import ForgotPasswordForm from '../../modules/accounts/components/ForgotPasswordForm';
import useForgotPassword from '../../modules/accounts/hooks/useForgotPassword';
import defaultNextImageLoader from '../../modules/common/utils/defaultNextImageLoader';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const { formatMessage } = useIntl();
  const onSubmit = async ({ email }) => {
    await forgotPassword({ email });
    return true;
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <Image
            className="mx-auto"
            src="/logo.svg"
            loader={defaultNextImageLoader}
            width={160}
            height={100}
            alt={formatMessage({
              id: 'unchained_logo',
              defaultMessage: 'Unchained Logo',
            })}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            {formatMessage({
              id: 'forgot_password',
              defaultMessage: 'Forgot your password?',
            })}
          </h2>
        </div>
        <ForgotPasswordForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
