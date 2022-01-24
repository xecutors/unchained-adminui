import ForgotPasswordForm from '../../modules/accounts/components/ForgotPasswordForm';
import useForgotPassword from '../../modules/accounts/hooks/useForgotPassword';

const ForgotPassword = () => {
  const { forgotPassword } = useForgotPassword();
  const onSubmit = async ({ email }) => {
    await forgotPassword({ email });
    return true;
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 antialiased">
      <ForgotPasswordForm onSubmit={onSubmit} />
    </div>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
