import React, { useEffect, useState } from 'react';
import { ClockIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import useVerifyEmail from '../modules/accounts/hooks/useVerifyEmail';
import Loading from '../modules/common/components/Loading';
import CustomError from '../modules/common/CustomError';
import useValidateEmailVerificationToken from '../modules/accounts/hooks/useValidateEmailVerificationToken';
import useModal from '../modules/modal/hooks/useModal';
import BlockingContent from '../modules/common/components/BlockingContent';

const VerifyEmail = () => {
  const { query } = useRouter();
  const { verifyEmail } = useVerifyEmail();
  const { formatMessage } = useIntl();
  const { token } = query;
  const [result, setResult] = useState({ success: null, message: null });
  const { isValid, loading } = useValidateEmailVerificationToken({ token });
  const { setModal } = useModal();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail({ token: token as string });
        setResult({
          ...result,
          success: true,
        });
      } catch (e: unknown) {
        if (e instanceof CustomError && e.message.includes('expired'))
          setResult({
            success: false,
            message: formatMessage({
              id: 'verification_token_expired',
              defaultMessage: 'Verification token expired',
            }),
          });
        else
          setResult({
            success: false,
            message: formatMessage({
              id: 'email_verification_failed',
              defaultMessage: 'Email verification failed',
            }),
          });
      }
    };
    if (query.token) verify();
  }, [query.token]);

  if (loading || typeof isValid !== 'boolean') return <Loading />;
  return !isValid ? (
    <BlockingContent>
      <h1 className="text-red-500 text-center font-extrabold text-2xl">
        Token invalid/expired
      </h1>
      <FormattedMessage
        tagName="dl"
        id="verify_email_token_invalid_error"
        defaultMessage="The email verification token is either invalid or expired. Please use
          the last reset link sent in your email or
          start the process again by going to {link}"
        values={{
          dl: (chunks) => <dl>{chunks}</dl>,
          dt: (chunks) => <dt>{chunks}</dt>,
          dd: (chunks) => <dd>{chunks}</dd>,
          link: (
            <Link
              href="/account/forgot-password"
              className="text-base font-medium text-slate-950 dark:text-slate-800 hover:text-slate-900 dark:hover:text-slate-400"
            >
              {formatMessage({
                id: 'forget_password',
                defaultMessage: 'Forgot your password?',
              })}
            </Link>
          ),
        }}
      />
      <Link
        href="/"
        className="m-auto group relative flex justify-center rounded-md border border-transparent bg-slate-900 dark:bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-950 dark:hover:bg-slate-500 focus:outline-hidden focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:ring-offset-2"
      >
        {formatMessage({
          id: 'go-home',
          defaultMessage: 'Go back home',
        })}
      </Link>
    </BlockingContent>
  ) : (
    <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
      <div
        className={classNames(
          'max-w-xl p-8 text-center  bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12',
          {
            'text-slate-800': result.success,
            'text-red-800': !result.success,
          },
        )}
      >
        <h3 className="text-2xl">
          {result.success
            ? formatMessage({
                id: 'email_verified_successfully',
                defaultMessage: 'Email Verified successfully',
              })
            : result.message}
        </h3>
        <div className="flex justify-center">
          {result.success ? (
            <EnvelopeOpenIcon
              className="w-24 h-24 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
          ) : (
            <ClockIcon
              className="w-24 h-24 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
          )}
        </div>

        <p>
          {result.success
            ? formatMessage({
                id: 'thank_you_for_verifying',
                defaultMessage: 'Thank you for verifying your email address',
              })
            : formatMessage({
                id: 'use_another_verification_token',
                defaultMessage:
                  'Please resend another verification email and try to verify again',
              })}
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="px-4 py-2 text-blue-200 bg-slate-900 dark:bg-slate-600 hover:bg-slate-950 dark:hover:bg-slate-500 rounded-sm"
          >
            {formatMessage({
              id: 'go_to_home',
              defaultMessage: 'Go to home',
            })}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

VerifyEmail.getLayout = (page) => page;
