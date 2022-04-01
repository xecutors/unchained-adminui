import {
  ChartBarIcon,
  CogIcon,
  TagIcon,
  HomeIcon,
  InboxIcon,
  CollectionIcon,
  AdjustmentsIcon,
  UserGroupIcon,
  UserIcon,
  LightningBoltIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import logOut from '../../accounts/hooks/logOut';
import useCurrentUser from '../../accounts/hooks/useCurrentUser';
import useShopInfo from '../hooks/useShopInfo';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import SideNav from './SideNav';
import UserAvatar from './UserAvatar';

const Layout = ({
  children,
  apollo,
  router,
  pageHeader = '',
  /* navigationType = 'default', */
}) => {
  const { formatMessage } = useIntl();
  const { shopInfo } = useShopInfo();
  const defaultNavigation = [
    {
      name: formatMessage({ id: 'home', defaultMessage: 'Home' }),
      icon: HomeIcon,
      href: '/',
    },
    {
      name: formatMessage({ id: 'reports', defaultMessage: 'Reports' }),
      icon: ChartBarIcon,
      children: [
        {
          name: formatMessage({
            id: 'daily_sync',
            defaultMessage: 'Daily sync',
          }),
          href: '/reports/daily-sync',
        },
      ],
    },
    {
      name: formatMessage({
        id: 'orders',
        defaultMessage: 'Orders',
      }),
      icon: InboxIcon,
      href: '/orders',
    },
    {
      name: formatMessage({
        id: 'products',
        defaultMessage: 'Products',
      }),
      icon: TagIcon,
      href: '/products',
    },
    {
      name: formatMessage({ id: 'assortments', defaultMessage: 'Assortments' }),
      icon: CollectionIcon,
      href: '/assortments',
    },
    {
      name: formatMessage({ id: 'filters', defaultMessage: 'Filters' }),
      icon: AdjustmentsIcon,
      href: '/filters',
    },
    {
      name: formatMessage({ id: 'users', defaultMessage: 'Users' }),
      icon: UserGroupIcon,
      href: '/users',
    },
    {
      name: formatMessage({ id: 'system', defaultMessage: 'System settings' }),
      icon: CogIcon,
      children: [
        {
          name: formatMessage({
            id: 'currencies',
            defaultMessage: 'Currencies',
          }),
          href: '/currency',
        },
        {
          name: formatMessage({ id: 'countries', defaultMessage: 'Countries' }),
          href: '/country',
        },
        {
          name: formatMessage({ id: 'languages', defaultMessage: 'Languages' }),
          href: '/language',
        },
        {
          name: formatMessage({
            id: 'delivery_providers',
            defaultMessage: 'Delivery providers',
          }),
          href: '/delivery-provider',
        },
        {
          name: formatMessage({
            id: 'payment_providers',
            defaultMessage: 'Payment providers',
          }),
          href: '/payment-provider',
        },
        {
          name: formatMessage({
            id: 'warehousing_provider',
            defaultMessage: 'Warehousing provider',
          }),
          href: '/warehousing-provider',
        },
      ],
    },
    {
      name: formatMessage({ id: 'activities', defaultMessage: 'Activities' }),
      icon: LightningBoltIcon,
      children: [
        {
          name: formatMessage({
            id: 'work_queue',
            defaultMessage: 'Work queue',
          }),
          href: '/works',
        },
        {
          name: formatMessage({ id: 'event', defaultMessage: 'Events' }),
          href: '/events',
        },
        // {
        //   name: formatMessage({
        //     id: 'quotations',
        //     defaultMessage: 'Quotations',
        //   }),
        //   href: '/quotations',
        // },
        // {
        //   name: formatMessage({
        //     id: 'enrollments',
        //     defaultMessage: 'Enrollments',
        //   }),
        //   href: '/enrollments',
        // },
      ],
    },
    {
      name: formatMessage({ id: 'account', defaultMessage: 'Account' }),
      icon: UserIcon,
      href: '/account',
    },
  ];

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
        className={`fixed inset-0 z-40 flex md:hidden  ${
          hideNav ? 'hidden' : ''
        } `}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-slate-600 bg-opacity-75"
          aria-hidden="true"
        />

        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              onClick={() => setHideNav(!hideNav)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Image
                src="/logo.svg"
                loader={defaultNextImageLoader}
                width={125}
                height={100}
                alt={formatMessage({
                  id: 'unchained_logo',
                  defaultMessage: 'Unchained Logo',
                })}
              />
            </div>
            <SideNav navigation={defaultNavigation} />
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col 2xl:w-96">
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Image
                src="/logo.svg"
                loader={defaultNextImageLoader}
                width={175}
                height={100}
                alt={formatMessage({
                  id: 'unchained_logo',
                  defaultMessage: 'Unchained Logo',
                })}
              />
            </div>
            <SideNav navigation={defaultNavigation} />
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64 2xl:pl-96">
        <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            onClick={() => setHideNav(!hideNav)}
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400"
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
        <main className="container mx-auto max-w-7xl flex-1 px-4 pt-5 pb-10 sm:px-6 md:px-8">
          <h3 className="ml-8 text-lg font-medium leading-6 text-slate-900">
            {pageHeader}
          </h3>
          {React.cloneElement(children, { shopInfo })}
        </main>
      </div>
    </div>
  );
};

export default Layout;
