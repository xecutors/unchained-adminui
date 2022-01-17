import { useIntl } from 'react-intl';

import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import PasswordField from '../../forms/components/PasswordField';

import useForm from '../../forms/hooks/useForm';

export default function SignupForm() {
  const intl = useIntl();

  const form = useForm({
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('auth failed')) {
        return 'error';
      }
      return '';
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
              src="https://publicare.ch/static/img/publicare-logo.png"
              alt="Publicare Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {intl.formatMessage({
                id: 'login_header',
                defaultMessage: 'Create new Account',
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
                  label={intl.formatMessage({
                    id: 'email',
                    defaultMessage: 'E-mail',
                  })}
                  className="appearance-none mb-2 relative block w-full px-3 py-2  border-gray-300 placeholder-gray-5 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="sam@example.com"
                />
              </div>
              <div>
                <PasswordField
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  label={intl.formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                  className="appearance-none mb-2 relative block w-full px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                />
              </div>
            </div>

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

                {intl.formatMessage({
                  id: 'sign-up',
                  defaultMessage: 'Sign Up',
                })}
              </button>
            </div>

            <div className=" text-sm">
              Already got a user?
              <a
                href="/log-in"
                className=" ml-2 font-medium text-indigo-600 hover:text-indigo-500"
              >
                {intl.formatMessage({
                  id: 'log_in',
                  defaultMessage: 'Log in',
                })}
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
