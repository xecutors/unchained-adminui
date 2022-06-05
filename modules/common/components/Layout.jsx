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
  MenuIcon,
} from '@heroicons/react/outline';
import { LinkIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import getConfig from 'next/config';
import logOut from '../../accounts/hooks/logOut';
import useCurrentUser from '../../accounts/hooks/useCurrentUser';
import ACTION_ROLES from '../data/roles';
import useShopInfo from '../hooks/useShopInfo';

import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import SideNav from './SideNav';
import UserAvatar from './UserAvatar';
import getLogo from '../utils/getLogo';

const { publicRuntimeConfig } = getConfig();

const Layout = ({
  children,
  apollo,
  router,
  pageHeader = '',

  /* navigationType = 'default', */
}) => {
  const { formatMessage } = useIntl();
  const { currentUser } = useCurrentUser();
  const { shopInfo } = useShopInfo();
  const [hideNav, setHideNav] = useState(true);

  const showCustomReports =
    publicRuntimeConfig.showCustomReports ??
    process.env.NEXT_PUBLIC_SHOW_CUSTOM_REPORTS;
  const logo = getLogo();
  const defaultNavigation = [
    {
      name: formatMessage({ id: 'home', defaultMessage: 'Home' }),
      icon: HomeIcon,
      href: '/',
    },
    showCustomReports && {
      name: formatMessage({ id: 'reports', defaultMessage: 'Reports' }),
      icon: ChartBarIcon,
      children: [
        {
          name: formatMessage({
            id: 'daily_sync',
            defaultMessage: 'Daily sync',
          }),
          requiredRole: ACTION_ROLES.work.manage,
          href: '/reports/daily-sync',
        },
      ],
    },
    {
      name: formatMessage({
        id: 'orders',
        defaultMessage: 'Orders',
      }),
      requiredRole: ACTION_ROLES.orders.manage,
      icon: InboxIcon,
      href: '/orders',
    },
    {
      name: formatMessage({
        id: 'products',
        defaultMessage: 'Products',
      }),
      requiredRole: ACTION_ROLES.products.manage,
      icon: TagIcon,
      href: '/products',
    },
    {
      name: formatMessage({ id: 'assortments', defaultMessage: 'Assortments' }),
      icon: CollectionIcon,
      href: '/assortments',
      requiredRole: ACTION_ROLES.assortments.manage,
    },
    {
      name: formatMessage({ id: 'filters', defaultMessage: 'Filters' }),
      icon: AdjustmentsIcon,
      requiredRole: ACTION_ROLES.filters.manage,
      href: '/filters',
    },
    {
      name: formatMessage({ id: 'users', defaultMessage: 'Users' }),
      icon: UserGroupIcon,
      href: '/users',
      requiredRole: 'viewUsers',
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
          requiredRole: ACTION_ROLES.currencies.manage,
          href: '/currency',
        },
        {
          name: formatMessage({ id: 'countries', defaultMessage: 'Countries' }),
          href: '/country',
          requiredRole: ACTION_ROLES.country.manage,
        },
        {
          name: formatMessage({ id: 'languages', defaultMessage: 'Languages' }),
          href: '/language',
          requiredRole: ACTION_ROLES.languages.manage,
        },
        {
          name: formatMessage({
            id: 'delivery_providers',
            defaultMessage: 'Delivery providers',
          }),
          requiredRole: ACTION_ROLES.deliveryProviders.manage,
          href: '/delivery-provider',
        },
        {
          name: formatMessage({
            id: 'payment_providers',
            defaultMessage: 'Payment providers',
          }),
          requiredRole: ACTION_ROLES.paymentProviders.manage,
          href: '/payment-provider',
        },
        {
          name: formatMessage({
            id: 'warehousing_provider',
            defaultMessage: 'Warehousing provider',
          }),
          requiredRole: ACTION_ROLES.warehousingProviders.manage,
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
          requiredRole: ACTION_ROLES.work.manage,
          href: '/works',
        },
        {
          name: formatMessage({ id: 'event', defaultMessage: 'Events' }),
          href: '/events',
          requiredRole: ACTION_ROLES.events.view,
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
    shopInfo?.externalLinks?.length && {
      name: formatMessage({ id: 'extensions', defaultMessage: 'Extensions' }),
      icon: LinkIcon,
      href: '/',
      children: shopInfo.externalLinks.map((link) => ({
        name: link.title,
        href: link.href,
      })),
    },
  ].filter(Boolean);

  const onLogout = async () => {
    await logOut(apollo);
    toast.success(
      formatMessage({
        id: 'logged_out',
        defaultMessage: 'Logged out',
      }),
    );
    router.push('/log-in');
  };

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

        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-slate-600">
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
              <Link href="/">
                <a>
                  <Image
                    src={logo}
                    loader={defaultNextImageLoader}
                    width={125}
                    height={100}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    alt={formatMessage({
                      id: 'unchained_logo',
                      defaultMessage: 'Unchained Logo',
                    })}
                  />
                </a>
              </Link>
            </div>
            <SideNav
              navigation={defaultNavigation}
              onClick={() => setHideNav(!hideNav)}
            />
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
      </div>

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col 2xl:w-96 dark:bg-slate-800 dark:text-white">
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-200 bg-white dark:bg-slate-600">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <Link href="/">
                <a>
                  <Image
                    src={logo}
                    loader={defaultNextImageLoader}
                    width={175}
                    height={100}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    alt={formatMessage({
                      id: 'unchained_logo',
                      defaultMessage: 'Unchained Logo',
                    })}
                  />
                </a>
              </Link>
            </div>
            <SideNav navigation={defaultNavigation} />
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
            <UserAvatar {...currentUser} onLogout={onLogout} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64 2xl:pl-96">
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-500  pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            onClick={() => setHideNav(!hideNav)}
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400 dark:text-white"
          >
            <span className="sr-only">
              {formatMessage({
                id: 'open_sidebar',
                defaultMessage: ' Open sidebar',
              })}
            </span>
            <MenuIcon
              fill="none"
              viewBox="0 0 24 24"
              className="h-8 w-8"
              stroke="currentColor"
              aria-hidden="true"
            />
          </button>
        </div>
        <main className="container mx-auto max-w-7xl flex-1 px-4 pt-5 pb-10 sm:px-6 md:px-8">
          <h3 className="ml-8 text-lg font-medium leading-6 text-slate-900">
            {pageHeader}
          </h3>
          {React.cloneElement(children)}
        </main>
      </div>
    </div>
  );
};

export default Layout;
