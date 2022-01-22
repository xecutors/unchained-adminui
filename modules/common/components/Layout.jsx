import Link from 'next/link';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Disclosure } from '@headlessui/react';
import {
  CogIcon,
  HomeIcon,
  OfficeBuildingIcon,
  UserIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import logOut from '../../accounts/hooks/logOut';
import useCurrentUser from '../../accounts/hooks/useCurrentUser';

const SideNav = () => {
  const { formatMessage } = useIntl();

  const navigation = [
    {
      name: formatMessage({ id: 'dashboard', defaultMessage: 'Dashboard' }),
      icon: HomeIcon,
      current: true,
      href: '/',
    },
    {
      name: 'System',
      icon: CogIcon,
      current: false,
      children: [
        {
          name: formatMessage({ id: 'users', defaultMessage: 'Users' }),
          current: false,
          href: '/users',
        },
        {
          name: formatMessage({
            id: 'currencies',
            defaultMessage: 'Currencies',
          }),
          href: '/currency',
          current: false,
        },
        {
          current: false,
          name: formatMessage({ id: 'countries', defaultMessage: 'Countries' }),
          href: '/country',
        },
        {
          current: false,
          name: formatMessage({ id: 'languages', defaultMessage: 'Languages' }),
          href: '/language',
        },
        {
          current: false,
          name: formatMessage({
            id: 'delivery_providers',
            defaultMessage: 'Delivery providers',
          }),
          href: '/delivery-provider',
        },
        {
          current: false,
          name: formatMessage({
            id: 'payment_provider',
            defaultMessage: 'Payment providers',
          }),
          href: '/payment-provider',
        },
        {
          current: false,
          name: formatMessage({
            id: 'warehousing_provider',
            defaultMessage: 'Warehousing provider',
          }),
          href: '/warehousing-provider',
        },
      ],
    },
    {
      name: 'Activities',
      icon: OfficeBuildingIcon,
      current: false,
      children: [
        {
          name: formatMessage({ id: 'Work', defaultMessage: 'Work queue' }),
          current: false,
          href: '/works',
        },
        {
          name: formatMessage({ id: 'event', defaultMessage: 'Events' }),
          current: false,
          href: '/events',
        },
        {
          name: formatMessage({
            id: 'quotations',
            defaultMessage: 'Quotations',
          }),
          current: false,
          href: '/quotations',
        },
        {
          name: formatMessage({
            id: 'orders',
            defaultMessage: 'Orders',
          }),
          current: false,
          href: '/orders',
        },
        {
          name: formatMessage({
            id: 'enrollments',
            defaultMessage: 'Enrollments',
          }),
          current: false,
          href: '/enrollments',
        },
      ],
    },
    {
      name: formatMessage({ id: 'account', defaultMessage: 'Account' }),
      icon: UserIcon,
      current: false,
      href: '/account',
    },
  ];
  return (
    <div className="mt-5 flex-grow flex flex-col">
      <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
        {navigation.map((item) =>
          !item.children ? (
            <div key={item.name}>
              <Link href={item?.href || '#'}>
                <a
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              </Link>
            </div>
          ) : (
            <Disclosure as="div" key={item.name} className="space-y-1">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                    )}
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                    <svg
                      className={classNames(
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
                      )}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1">
                    {item.children.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href}>
                        <a className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          {subItem.name}
                        </a>
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ),
        )}
      </nav>
    </div>
  );
};

const UserAvatar = ({ avatar, username, onLogout }) => {
  const { formatMessage } = useIntl();
  return (
    <a onClick={onLogout} className="flex-shrink-0 group block">
      <div className="flex items-center">
        <div>
          {avatar ? (
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={avatar?.url}
              alt=""
            />
          ) : (
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}
        </div>
        <div className="ml-3">
          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
            {username}
          </p>
          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
            {formatMessage({
              id: 'log_out',
              defaultMessage: 'Log out',
            })}
          </p>
        </div>
      </div>
    </a>
  );
};

const Layout = ({ children, apollo, router, pageHeader = '' }) => {
  const { formatMessage } = useIntl();

  const onLogout = async () => {
    await logOut(apollo);
    router.replace('/');
  };

  const [hideNav, setHideNav] = useState(true);

  const { currentUser } = useCurrentUser();

  return (
    <div>
      <div
        className={`fixed inset-0 flex z-40 md:hidden  ${
          hideNav ? 'hidden' : ''
        } `}
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
              onClick={() => setHideNav(!hideNav)}
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
            <SideNav />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
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
            <SideNav />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
          <button
            type="button"
            onClick={() => setHideNav(!hideNav)}
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
