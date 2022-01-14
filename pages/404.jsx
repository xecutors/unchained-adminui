import Link from 'next/link';
import { useIntl } from 'react-intl';

const NotFound = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="min-h-full pt-16 pb-12 flex flex-col bg-white ">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 flex justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">
              {formatMessage({ id: ' Workflow', defaultMessage: ' workflow' })}{' '}
            </span>
            <img
              className="h-12 w-auto"
              src="https://publicare.ch/static/img/publicare-logo.png"
              alt="Publicare"
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">
              {formatMessage({ id: 'error', defaultMessage: '404 error' })}{' '}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              {formatMessage({
                id: 'page_not_found',
                defaultMessage: 'Page not found.',
              })}
            </h1>
            <p className="mt-2 text-base text-gray-500">
              {formatMessage({
                id: 'sorry_we_couldnt_find_the_page_youre_looking_for',
                defaultMessage:
                  'Sorry, we couldn’t find the page you’re looking for.',
              })}
            </p>
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  {formatMessage({
                    id: 'go_back_home',
                    defaultMessage: 'Go back home',
                  })}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
