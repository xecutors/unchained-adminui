import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
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
      const { id, token, tokenExpires } = data.loginWithPassword;
      await storeLoginToken(id, token, new Date(tokenExpires));
      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
       console.log(e);
      return false;
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
          defaultMessage: 'Invalid credential error',
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

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.svg"
              alt="Unchained Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {formatMessage({
                id: 'login_header',
                defaultMessage: 'Log in to your account',
              })}
            </h2>
          </div>
          <Form
            form={form}
            className="mt-8 space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <EmailField
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                  hideLabel
                  placeholder="samuel@example.com"
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
                  hideLabel
                  placeholder="password"
                />
              </div>
            </div>

            <div className="m-2 flex items-center justify-between">
              <div className="flex items-center">
                <CheckboxField
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  label={formatMessage({
                    id: 'remember_password',
                    defaultMessage: ' Remember me',
                  })}
                />
              </div>

              <div className="text-sm">
                <Link href="/account/forgot-password">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    {formatMessage({
                      id: 'forget_password',
                      defaultMessage: 'Forgot your password?',
                    })}
                  </a>
                </Link>
              </div>
            </div>
            
            <FormErrors />
            <div className="m-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
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
            <div className=" text-sm">
              {formatMessage({
                id: 'create_new_account',
                defaultMessage: 'Create new Account?',
              })}
              <a
                href="/sign-up"
                className=" ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                {intl.formatMessage({
                  id: 'sign_up',
                  defaultMessage: 'Sign up',
                })}
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
