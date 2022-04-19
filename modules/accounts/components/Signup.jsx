import Image from 'next/image';
import { useIntl } from 'react-intl';
import FormWrapper from '../../common/components/FormWrapper';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import getLogo from '../../common/utils/getLogo';

import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import TextField from '../../forms/components/TextField';

import useForm from '../../forms/hooks/useForm';

const SignUpForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();

  const form = useForm({
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('auth failed'))
        return formatMessage({
          id: 'auth_error',
          defaultMessage: 'Authentication error',
        });
      if (error?.message?.includes('Username already exists'))
        return formatMessage({
          id: 'username_exists_error',
          defaultMessage: 'Username already exists',
        });

      if (error?.message?.includes('Email already exists'))
        return formatMessage({
          id: 'email_exists_error',
          defaultMessage: 'Email already exists',
        });

      return error?.message || '';
    },
    submit: onSubmit,
    onSubmitSuccess,
    initialValues: {
      email: null,
      password: null,
    },
  });
  const logo = getLogo();
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <Image
              className="mx-auto h-12 w-auto"
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
              {formatMessage({
                id: 'sign_up_header',
                defaultMessage: 'Create new account',
              })}
            </h2>
          </div>
          <FormWrapper>
            <Form
              form={form}
              className="mt-8 space-y-6 pt-4 pb-8 shadow sm:rounded-lg sm:px-10"
            >
              <input type="hidden" name="remember" value="true" />
              <div className="space-y-6 rounded-md shadow-sm">
                <div>
                  <EmailField
                    id="email-address"
                    name="email"
                    autoComplete="email"
                    required
                    label={formatMessage({
                      id: 'email',
                      defaultMessage: 'Email',
                    })}
                  />
                </div>
                <div>
                  <TextField
                    id="username"
                    name="username"
                    autoComplete="off"
                    required
                    label={formatMessage({
                      id: 'username',
                      defaultMessage: 'Username',
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
                  />
                </div>
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

                  {formatMessage({
                    id: 'sign-up',
                    defaultMessage: 'Sign Up',
                  })}
                </button>
              </div>

              <div className="text-sm text-slate-400">
                {formatMessage({
                  id: 'already_got_a_user',
                  defaultMessage: 'Already got a user?',
                })}
                <a
                  href="/log-in"
                  className=" ml-2 font-medium text-indigo-600 hover:text-indigo-500 dark:text-fuchsia-400 dark:hover:text-fuchsia-500"
                >
                  {formatMessage({
                    id: 'log_in',
                    defaultMessage: 'Log in',
                  })}
                </a>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
