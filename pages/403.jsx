import { LockClosedIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import getConfig from 'next/config';
import useCurrentUser from '../modules/accounts/hooks/useCurrentUser';
import ImageWithFallback from '../modules/common/components/ImageWithFallback';

const {
  publicRuntimeConfig: { logo },
} = getConfig();

const NotAuthorized = () => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  return (
    <div className="flex min-h-full flex-col bg-white dark:bg-slate-900 pt-16 pb-12 ">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <Link href="/" className="inline-flex">
            <span className="sr-only">
              {formatMessage({
                id: 'unchained',
                defaultMessage: 'Unchained Admin UI',
              })}{' '}
            </span>
            <ImageWithFallback
              src={logo}
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
                id: 'error_403',
                defaultMessage: '403 unauthorized',
              })}
            </p>
            <div className="flex justify-center items-center">
              <LockClosedIcon className="h-12 w-12 inline-block text-red-300" />
              <h1 className="text-4xl inline-block uppercase font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl">
                {formatMessage({
                  id: 'unauthorized_page',
                  defaultMessage: 'forbidden',
                })}
              </h1>
            </div>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
              {formatMessage({
                id: 'not_access_message',
                defaultMessage:
                  'Sorry, The page you trying to access has restricted access.',
              })}
            </p>
            <div className="mt-6">
              {currentUser?._id ? (
                <Link
                  href="/"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-300"
                >
                  {formatMessage({
                    id: 'go_back_home',
                    defaultMessage: 'Go back home',
                  })}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              ) : (
                <Link
                  href="/log-in"
                  className="text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  {formatMessage({
                    id: 'go_to_login',
                    defaultMessage: 'Go to login',
                  })}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotAuthorized;

NotAuthorized.getLayout = (page) => page;
