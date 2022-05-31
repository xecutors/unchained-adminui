import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import ResetPasswordForm from '../modules/accounts/components/ResetPasswordForm';
import useResetPassword from '../modules/accounts/hooks/useResetPassword';
import {
  addApolloState,
  initializeApollo,
} from '../modules/apollo/apolloClient';

const PasswordReset = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();
  const { resetPassword } = useResetPassword();
  const { token } = query;

  const onSubmit = async ({ newPassword }) => {
    return resetPassword({ newPassword, token, disableHashing: true });
  };

  return (
    <div className="flex min-h-screen justify-center bg-slate-100 dark:bg-slate-600 antialiased">
      <div className="container my-auto mt-24 max-w-md border-2 border-slate-200 bg-white dark:bg-slate-600 shadow rounded dark:shadow-white p-3 sm:mt-40">
        <div className="m-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-700 dark:text-white">
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
          <ResetPasswordForm onSubmit={onSubmit} />
        </div>
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

export default PasswordReset;

PasswordReset.getLayout = (page) => page;
