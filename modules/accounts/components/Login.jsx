import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';

import FormWrapper from '../../common/components/FormWrapper';
import SandboxInput from '../../common/components/SandboxInput';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import getLogo from '../../common/utils/getLogo';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import TextField from '../../forms/components/TextField';

import useForm from '../../forms/hooks/useForm';
import useGenerateLoginCredentials from '../hooks/useGenerateLoginCredentials';
import useLoginWithPassword from '../hooks/useLoginWithPassword';
import useLoginWithWebAuthn from '../hooks/useLoginWithWebAuthn';
import { storeLoginToken } from '../utils/store';

const GetCurrentStep = ({ step }) => {
  const { formatMessage } = useIntl();

  switch (parseInt(step, 10)) {
    case 2:
      return (
        <>
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
        </>
      );
    case 3:
      return (
        <TextField
          id="totp-code"
          name="totpCode"
          autoComplete="off"
          label={formatMessage({
            id: 'totp_code',
            defaultMessage: 'TOTP code',
          })}
          placeholder={formatMessage({
            id: 'totp_code',
            defaultMessage: 'TOTP code',
          })}
        />
      );
    default:
      return (
        <TextField
          id="username-or-email"
          name="usernameOrEmail"
          className="mt-1"
          type="text"
          autoComplete="email"
          required
          label={formatMessage({
            id: 'username_or_email',
            defaultMessage: 'Username/Email',
          })}
          placeholder={formatMessage({
            id: 'username_or_email',
            defaultMessage: 'Username/Email',
          })}
        />
      );
  }
};

const {
  publicRuntimeConfig: { allowEndpointSwitch },
} = getConfig();

const LogInForm = ({ endpoint, handleOnBlur, connection }) => {
  const intl = useIntl();
  const { logInWithPassword } = useLoginWithPassword();
  const { isAuthenticated } = useAuth();
  const { loginWithWebAuthn, error: webAuthLoginError } =
    useLoginWithWebAuthn();
  const router = useRouter();
  const goToNext = () => {
    router.push({
      query: {
        step: parseInt(router.query.step, 10) + 1,
      },
    });
  };

  const { generateLoginCredentials } = useGenerateLoginCredentials();

  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'welcome',
    defaultMessage: 'Welcome!',
  });

  const logInWithWebAuth = async (username) => {
    const webAuthnPublicKeyCredentials = await generateLoginCredentials({
      username,
    });
    const { data } = await loginWithWebAuthn({
      webAuthnPublicKeyCredentials,
    });
    const { id, token, tokenExpires } = data?.loginWithWebAuthn;
    await storeLoginToken(id, token, new Date(tokenExpires));
  };

  const onSubmit = async ({ usernameOrEmail, password, totpCode }) => {
    if (router.query.step === '1') {
      try {
        await logInWithWebAuth(usernameOrEmail);
        if (webAuthLoginError) {
          alert(webAuthLoginError.message);
        }
      } catch (e) {
        goToNext();
      }
    } else if (router.query.step === '2') {
      const result = await logInWithPassword({
        usernameOrEmail,
        password,
        disableHashing: true,
      });

      if (result.errors?.length) {
        return false;
      }
      router.push('/');

      return true;
    } else if (router.query.step === '3') {
      const result = await logInWithPassword({
        usernameOrEmail,
        password,
        disableHashing: true,
        totpCode,
      });
      if (result.errors.length) {
        return false;
      }

      router.push('/');
    }
    return false;
  };

  const onSubmitSuccess = async (_, { loginWithPassword }) => {
    const { id, token, tokenExpires, user } = loginWithPassword || {};
    await storeLoginToken(id, token, new Date(tokenExpires));

    if (user?._id && !user?.roles?.includes('admin')) router.push('/account');

    router.push('/');
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    onSubmitSuccess,
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('Invalid credentials'))
        return formatMessage({
          id: 'invalid_credential_error',
          defaultMessage: 'Invalid credential, please try again',
        });

      if (error?.message?.includes('2FA code required')) {
        form.formik.setFieldError(
          'totpCode',
          formatMessage({
            id: 'totp_code_required',
            defaultMessage: 'TOTP code is required',
          }),
        );
      }
      if (error?.message?.toLowerCase()?.includes('no password set')) {
        form.formik.setFieldError(
          'password',
          formatMessage({
            id: 'user_password_not_set',
            defaultMessage: 'User password not set',
          }),
        );
        return formatMessage({
          id: 'two_factor_authentication_required',
          defaultMessage: 'Two factor authentication code required',
        });
      }
      if (error?.message?.includes("2FA code didn't match")) {
        form.formik.setFieldError(
          'totpCode',
          formatMessage({
            id: 'totp_code_not_match',
            defaultMessage: 'TOTP code did not match',
          }),
        );
      }

      return '';
    },
    initialValues: {
      usernameOrEmail: null,
      password: null,
      totpCode: null,
    },
  });

  useEffect(() => {
    if (!router.query.step)
      router.push({
        query: {
          step: 1,
        },
      });
  }, [router.query.step]);

  const logo = getLogo();
  if (isAuthenticated()) {
    router.replace('/');
  }

  return (
    <>
      {allowEndpointSwitch ? (
        <SandboxInput
          endpoint={endpoint}
          handleOnBlur={handleOnBlur}
          connection={connection}
        />
      ) : null}

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <Image
              className="mx-auto"
              src={logo}
              loader={defaultNextImageLoader}
              placeholder="blur"
              blurDataURL="/placeholder.png"
              width={160}
              height={100}
              alt={formatMessage({
                id: 'unchained_logo',
                defaultMessage: 'Unchained Logo',
              })}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-200">
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
              <GetCurrentStep step={router.query.step} />
              <FormErrors />
              <div className="my-2">
                <button
                  type="submit"
                  id="submit"
                  disabled={!form.formik.isValid}
                  name="submit"
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
              <div className="text-sm text-slate-400 dark:text-slate-200">
                {formatMessage({
                  id: 'create_new_account',
                  defaultMessage: 'Create new account?',
                })}
                <Link href="/sign-up">
                  <a className="ml-2 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    {intl.formatMessage({
                      id: 'sign_up',
                      defaultMessage: 'Sign up',
                    })}
                  </a>
                </Link>
              </div>
            </Form>
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default LogInForm;
