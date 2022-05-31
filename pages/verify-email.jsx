import { ClockIcon, MailOpenIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import useVerifyEmail from '../modules/accounts/hooks/useVerifyEmail';
import Loading from '../modules/common/components/Loading';

const VerifyEmail = () => {
  const { query } = useRouter();
  const { verifyEmail } = useVerifyEmail();
  const { formatMessage } = useIntl();
  const [result, setResult] = useState({ success: null, message: null });

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail({ token: query.token });
        setResult({
          ...result,
          success: true,
        });
      } catch (e) {
        if (e.message.includes('expired'))
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
  }, [query.token, verifyEmail, formatMessage, result]);

  if (result.success === null) return <Loading />;
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-blue-100 min-w-screen">
      <div
        className={classNames(
          'max-w-xl p-8 text-center  bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12',
          {
            'text-gray-800': result.success,
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
            <MailOpenIcon
              className="w-24 h-24 text-green-400"
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
          <Link href="/">
            <a
              type="button"
              className="px-4 py-2 text-blue-200 bg-blue-600 rounded"
            >
              {formatMessage({
                id: 'go_to_home',
                defaultMessage: 'Go to home',
              })}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

VerifyEmail.getLayout = (page) => page;
