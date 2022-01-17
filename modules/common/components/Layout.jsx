import Link from 'next/link';
import { useIntl } from 'react-intl';
import logOut from '../../accounts/hooks/logOut';

const Icons = ({ url }) => {
  return (
    <svg
      className="text-gray-500 mr-4 flex-shrink-0 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={url}
      />
    </svg>
  );
};

const sidenavItems = [
  {
    title: 'Sync Status',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    path: '/',
  },
  {
    title: 'Users',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    path: '/users',
  },
  {
    title: 'Countries',
    icon: 'M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9',
    path: '/country',
  },
  {
    title: 'Languages',
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    path: '/language',
  },
  {
    title: 'Currencies',
    icon: 'M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z',
    path: '/currency',
  },
  {
    title: 'Payments',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    path: '/payment-provider',
  },
  {
    title: 'Delivery',
    icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z',
    path: '/delivery-provider',
  },
  {
    title: 'Warehousing',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    path: '/warehousing-provider',
  },
];

const Layout = ({ children, apollo, router, pageHeader = '' }) => {
  const { formatMessage } = useIntl();
  const onLogout = async () => {
    await logOut(apollo);
    router.replace('/');
  };

  return (
    <div>
      <div
        className="fixed inset-0 flex z-40 md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        />

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">
                {formatMessage({
                  id: 'close_sidebar',
                  defaultMessage: 'Close sidebar',
                })}
              </span>

              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://publicare.ch/static/img/publicare-logo.png"
                alt="Publicare"
              />
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {sidenavItems.map(({ title, path, icon }) => (
                <Link href={path} key={title}>
                  <a
                    href="#"
                    className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    <Icons url={icon} />
                    {title}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQGd5mqmAIm8jQ/profile-displayphoto-shrink_400_400/0/1629440843346?e=1647475200&v=beta&t=29RZb5jSBQwZXvbVgMIT5FZWxXfjp4SqZkaE1LsxR60"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                    Tom Cook
                  </p>
                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                    {formatMessage({
                      id: 'view_profile',
                      defaultMessage: 'View profile',
                    })}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" />
      </div>

      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://publicare.ch/static/img/publicare-logo.png"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {sidenavItems.map(({ title, path, icon }) => (
                <Link href={path} key={`${title}-`}>
                  <a
                    href="#"
                    className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  >
                    <Icons url={icon} />
                    {title}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a
              href="#"
              className="flex-shrink-0 w-full group block"
              onClick={onLogout}
            >
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQGd5mqmAIm8jQ/profile-displayphoto-shrink_400_400/0/1629440843346?e=1647475200&v=beta&t=29RZb5jSBQwZXvbVgMIT5FZWxXfjp4SqZkaE1LsxR60"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {formatMessage({
                      id: 'niki_repasi',
                      defaultMessage: 'Niki Repasi',
                    })}
                  </p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                    {formatMessage({
                      id: 'view_profile',
                      defaultMessage: 'View profile',
                    })}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">
              {formatMessage({
                id: 'open_sidebar',
                defaultMessage: ' Open sidebar',
              })}
            </span>

            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main className="flex-1">
          <div className="py-2">
            <div className=" px-4 py-5 border-gray-200 sm:px-6">
              <h3 className="ml-8 text-lg leading-6 font-medium text-gray-900">
                {pageHeader}
              </h3>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
