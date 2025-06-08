import Link from 'next/link';
import { useIntl } from 'react-intl';
import Button from './Button';
import ImageWithFallback from './ImageWithFallback';

const ErrorFallback = ({ error = null, resetError = null }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex min-h-full flex-col bg-white dark:bg-slate-900 pt-16 pb-12 ">
      <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 justify-center">
          <Link href="/" className="inline-flex">
            <span className="sr-only">
              {formatMessage({
                id: 'unchained',
                defaultMessage: 'Unchained Admin UI',
              })}{' '}
            </span>
            <ImageWithFallback
              src={process.env.NEXT_PUBLIC_LOGO}
              width={200}
              height={100}
              alt={formatMessage({
                id: 'unchained_logo',
                defaultMessage: 'Unchained Logo',
              })}
            />
          </Link>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              {formatMessage({
                id: 'error_500',
                defaultMessage: '500, unexpected error',
              })}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl">
              {formatMessage({
                id: 'internal_server_error',
                defaultMessage: '500 Internal Server Error.',
              })}
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
              {formatMessage({
                id: 'internal_server_error_message',
                defaultMessage:
                  'Sorry, It is not you, it is us. We are working on to fix this.  .',
              })}
            </p>
            {error?.message && (
              <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
                {error?.message}
              </p>
            )}
            <div className="mt-6 flex">
              <Link
                href="/"
                className="text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                {formatMessage({
                  id: 'try_again',
                  defaultMessage: 'try-again',
                })}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
              {resetError && (
                <Button
                  onClick={resetError}
                  text={formatMessage({
                    id: 'try-again',
                    defaultMessage: 'Try again',
                  })}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorFallback;
