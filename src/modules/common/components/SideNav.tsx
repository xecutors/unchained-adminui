import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ThemeToggle from './ThemeToggle';

const ChildrenNav = ({ item, hasRole, onSelected, narrowView }) => {
  const router = useRouter();

  if (narrowView) {
    // In narrow view, show only icon with tooltip for children nav items
    return item.children?.some(
      (d) => !d?.requiredRole || hasRole(d?.requiredRole),
    ) ? (
      <div key={item.name} className="relative group">
        <button
          className="flex w-full justify-center items-center p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={item.name}
        >
          {item?.icon && (
            <item.icon
              className="h-6 w-6 text-slate-800 dark:text-slate-300"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    ) : null;
  }

  return item.children?.some(
    (d) => !d?.requiredRole || hasRole(d?.requiredRole),
  ) ? (
    <Disclosure defaultOpen as="div" key={item.name} className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex w-full cursor-pointer hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 dark:text-slate-400 items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-800',
            )}
          >
            {item?.icon && (
              <item.icon
                className="mr-3 h-6 w-6 shrink-0 text-slate-800 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                aria-hidden="true"
              />
            )}
            <span className="flex-1 dark:text-slate-400">{item.name}</span>
          </Disclosure.Button>
          <Disclosure.Panel className="pl-6 space-y-1" onClick={onSelected}>
            {item.children
              .filter((f) => !f?.requiredRole || hasRole(f.requiredRole))
              .map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={classNames(
                    'group flex w-full items-center rounded-md py-2 pl-5 pr-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900',
                    {
                      ' dark:bg-slate-800 text-slate-900 dark:text-slate-400 bg-slate-50 hover:bg-slate-100':
                        router.pathname === subItem.href,
                    },
                  )}
                >
                  {subItem.name}
                </Link>
              ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : null;
};

const SideNav = ({ navigation, onClick = null, narrowView = false }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const router = useRouter();

  return (
    <div className="mt-8 flex grow flex-col dark:bg-slate-900">
      <nav
        className={`flex-1 space-y-1 bg-white dark:bg-slate-900 ${narrowView ? 'px-2' : 'px-2 lg:px-4 2xl:px-6'}`}
        aria-label="Sidebar"
      >
        {navigation.map((item) =>
          !item.children &&
          (!item.requiredRole || hasRole(item.requiredRole)) ? (
            <div key={item.name} onClick={onClick}>
              <Link
                href={item?.href || '#'}
                className={classNames(
                  'group flex w-full hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 items-center rounded-md py-2 text-sm font-medium',
                  {
                    'text-slate-900 dark:text-slate-400 bg-slate-50 dark:bg-slate-800':
                      router.asPath === item.href,
                    'justify-center': narrowView,
                    'pl-2': !narrowView,
                  },
                )}
                title={narrowView ? item.name : undefined}
              >
                {item?.icon && (
                  <item.icon
                    className={classNames(
                      'h-6 w-6 shrink-0 text-slate-800 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100',
                      {
                        'text-slate-900 dark:text-slate-100':
                          router.asPath === item.href,
                        'mr-3': !narrowView,
                      },
                    )}
                    aria-hidden="true"
                  />
                )}
                {!narrowView && (
                  <span className="flex-1 dark:text-slate-400">
                    {item.name}
                  </span>
                )}
              </Link>
            </div>
          ) : (
            <ChildrenNav
              key={item.name}
              item={item}
              hasRole={hasRole}
              onSelected={onClick}
              narrowView={narrowView}
            />
          ),
        )}
      </nav>
    </div>
  );
};

export default SideNav;
