import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import {
  addApolloState,
  initializeApollo,
} from '../modules/apollo/apolloClient';
import defaultNextImageLoader from '../modules/common/utils/defaultNextImageLoader';
import getLogo from '../modules/common/utils/getLogo';

const InternalError = () => {
  const { formatMessage } = useIntl();
  const logo = getLogo();
  return (
    <div className="flex min-h-full flex-col bg-white dark:bg-slate-600 pt-16 pb-12 ">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">
              {formatMessage({
                id: 'unchained',
                defaultMessage: 'Unchained Admin UI',
              })}{' '}
            </span>
            <Image
              src={logo}
              loader={defaultNextImageLoader}
              width={200}
              height={100}
              placeholder="blur"
              blurDataURL="/placeholder.png"
              alt={formatMessage({
                id: 'unchained_logo',
                defaultMessage: 'Unchained Logo',
              })}
            />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
              {formatMessage({
                id: 'error_500',
                defaultMessage: '500, unexpected error',
              })}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {formatMessage({
                id: 'internal_server_error',
                defaultMessage: '500 Internal Server Error.',
              })}
            </h1>
            <p className="mt-2 text-base text-slate-500 dark:text-white">
              {formatMessage({
                id: 'not_found_message',
                defaultMessage:
                  'Sorry, It is not you, it is us. We are working on to fix this.  .',
              })}
            </p>
            <div className="mt-6">
              <Link href="/">
                <a className="text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                  {formatMessage({
                    id: 'try_again',
                    defaultMessage: 'try-again',
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

export async function getStaticProps({ locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 3600,
  });
}

export default InternalError;

InternalError.getLayout = (page) => page;
