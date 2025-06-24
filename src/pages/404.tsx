import Link from 'next/link';
import { useIntl } from 'react-intl';
import ImageWithFallback from '../modules/common/components/ImageWithFallback';

const NotFound = () => {
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
                id: 'error_404',
                defaultMessage: '404 error',
              })}{' '}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl">
              {formatMessage({
                id: 'page_not_found',
                defaultMessage: 'Page not found.',
              })}
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-slate-200">
              {formatMessage({
                id: 'not_found_message',
                defaultMessage:
                  'Sorry, we couldn’t find the page you’re looking for.',
              })}
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="text-base font-medium text-slate-950 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-400"
              >
                {formatMessage({
                  id: 'go_back_home',
                  defaultMessage: 'Go back home',
                })}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

NotFound.getLayout = (page) => page;
