import {
  BriefcaseIcon,
  CogIcon,
  HomeIcon,
  OfficeBuildingIcon,
  UserIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import logOut from '../../accounts/hooks/logOut';
import useCurrentUser from '../../accounts/hooks/useCurrentUser';
import MiniUserAvatar from './MiniUserAvatar';
import SideNav from './SideNav';
import UserAvatar from './UserAvatar';

const Layout = ({
  children,
  apollo,
  router,
  pageHeader = '',
  navigationType = 'default',
}) => {
  const { formatMessage } = useIntl();
  const defaultNavigation = [
    {
      name: formatMessage({ id: 'dashboard', defaultMessage: 'Dashboard' }),
      icon: HomeIcon,
      current: true,
      href: '/',
    },
    {
      name: formatMessage({ id: 'system', defaultMessage: 'System' }),
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
      name: formatMessage({ id: 'master_data', defaultMessage: 'Master Data' }),
      icon: OfficeBuildingIcon,
      current: false,
      children: [
        {
          name: formatMessage({
            id: 'assortments',
            defaultMessage: 'Assortments',
          }),
          current: false,
          href: '/assortments',
        },
        {
          name: formatMessage({
            id: 'products',
            defaultMessage: 'Products',
          }),
          current: false,
          href: '/products',
        },
        {
          name: formatMessage({ id: 'filters', defaultMessage: 'Filters' }),
          current: false,
          href: '/filters',
        },
      ],
    },
    {
      name: formatMessage({ id: 'activities', defaultMessage: 'Activities' }),
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

  const reportNavigation = [
    {
      name: formatMessage({ id: 'reports', defaultMessage: 'Reports' }),
      icon: BriefcaseIcon,
      current: false,
      children: [
        {
          name: formatMessage({
            id: 'daily_sync',
            defaultMessage: 'Daily sync',
          }),
          current: false,
          href: '/reports/daily-sync',
        },
      ],
    },
  ];

  const navigations = { default: defaultNavigation, report: reportNavigation };
  const successfullyLoggedOutMessage = formatMessage({
    id: 'logged_out',
    defaultMessage: 'Logged out',
  });
  const onLogout = async () => {
    await logOut(apollo);
    toast.success(successfullyLoggedOutMessage);
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
            <SideNav navigation={navigations[navigationType]} />
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <MiniUserAvatar
              {...currentUser}
              showName
              url={currentUser?.avatar?.file.url}
              onLogout={onLogout}
            />
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
            <SideNav navigation={navigations[navigationType]} />
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
        <main className="container pt-5 max-w-7xl mx-auto flex-1 px-4 sm:px-6 md:px-8">
          <h3 className="ml-8 text-lg leading-6 font-medium text-gray-900">
            {pageHeader}
          </h3>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
