import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import getLogo from '../../common/utils/getLogo';
import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';

import useForm from '../../forms/hooks/useForm';
import useLoginWithPassword from '../hooks/useLoginWithPassword';
import { storeLoginToken } from '../utils/store';

export default function LogInForm() {
  const intl = useIntl();
  const { logInWithPassword } = useLoginWithPassword();
  const { setAuthContext } = useAuth();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'welcome',
    defaultMessage: 'Welcome!',
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await logInWithPassword({
        email,
        password,
        disableHashing: true,
      });
      const { id, token, tokenExpires, user } = data?.loginWithPassword || {};
      await storeLoginToken(id, token, new Date(tokenExpires));

      setAuthContext(id, user?.allowedActions);
      if (user?._id && !user?.roles?.includes('admin')) router.push('/account');
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return { error: e.message };
    }
  };

  const onSubmitSuccess = () => {
    router.replace('/');
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    onSubmitSuccess,
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('auth failed'))
        return formatMessage({
          id: 'auth_error',
          defaultMessage: 'Authentication error',
        });
      if (error?.message?.includes('Invalid credentials'))
        return formatMessage({
          id: 'invalid_credential_error',
          defaultMessage: 'Invalid credential, please try again',
        });

      if (error?.message?.includes('Email already exists'))
        return formatMessage({
          id: 'email_exists_error',
          defaultMessage: 'Email already exists',
        });

      return error?.message || '';
    },
    initialValues: {
      email: null,
      password: null,
    },
  });

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
            alt={formatMessage({
              id: 'unchained_logo',
              defaultMessage: 'Unchained Logo',
            })}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            {formatMessage({
              id: 'login_header',
              defaultMessage: 'Log in to your account',
            })}
          </h2>
        </div>
        <FormWrapper>
          <Form
            form={form}
            className="mt-8 space-y-6 px-4 pt-3 pb-8 sm:rounded-lg sm:px-10"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="space-y-6 rounded-md shadow-sm">
              <div>
                <EmailField
                  id="email-address"
                  name="email"
                  className="mt-1"
                  type="email"
                  autoComplete="email"
                  required
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                  placeholder={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                />
              </div>
              <div>
                <PasswordField
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  label={formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                  placeholder={formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                />
              </div>
            </div>

            <div className="my-1 text-sm sm:my-0 text-left">
              <Link href="/account/forgot-password">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  {formatMessage({
                    id: 'forget_password',
                    defaultMessage: 'Forgot your password?',
                  })}
                </a>
              </Link>
            </div>

            <FormErrors />
            <div className="my-2">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {formatMessage({ id: 'log_in', defaultMessage: 'Log in' })}
              </button>
            </div>
            <div className="text-sm text-slate-400">
              {formatMessage({
                id: 'create_new_account',
                defaultMessage: 'Create new account?',
              })}
              <a
                href="/sign-up"
                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                {intl.formatMessage({
                  id: 'sign_up',
                  defaultMessage: 'Sign up',
                })}
              </a>
            </div>
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
}
