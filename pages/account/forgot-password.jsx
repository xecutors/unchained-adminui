import Image from 'next/image';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import ForgotPasswordForm from '../../modules/accounts/components/ForgotPasswordForm';
import useForgotPassword from '../../modules/accounts/hooks/useForgotPassword';
import {
  addApolloState,
  initializeApollo,
} from '../../modules/apollo/apolloClient';
import defaultNextImageLoader from '../../modules/common/utils/defaultNextImageLoader';
import getLogo from '../../modules/common/utils/getLogo';

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

  const logo = getLogo();

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <Image
            className="mx-auto"
            src={logo}
            loader={defaultNextImageLoader}
            width={160}
            height={100}
            placeholder="blur"
            blurDataURL="/placeholder.png"
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

export async function getStaticProps({ locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 3600,
  });
}

export default ForgotPassword;

ForgotPassword.getLayout = (page) => page;
