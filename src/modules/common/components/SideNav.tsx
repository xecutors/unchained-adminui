import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ThemeToggle from './ThemeToggle';

const ChildrenNav = ({ item, hasRole, onSelected }) => {
  const router = useRouter();

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

const SideNav = ({ navigation, onClick = null }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const router = useRouter();

  return (
    <div className="mt-8 flex grow flex-col dark:bg-slate-900">
      <nav
        className="flex-1 space-y-1 bg-white dark:bg-slate-900 px-2 lg:px-4 2xl:px-6"
        aria-label="Sidebar"
      >
        {navigation.map((item) =>
          !item.children &&
          (!item.requiredRole || hasRole(item.requiredRole)) ? (
            <div key={item.name} onClick={onClick}>
              <Link
                href={item?.href || '#'}
                className={classNames(
                  'group flex w-full hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 items-center rounded-md py-2 pl-2 text-sm font-medium ',
                  {
                    'text-slate-900 dark:text-slate-400 bg-slate-50 dark:bg-slate-800':
                      router.asPath === item.href,
                  },
                )}
              >
                {item?.icon && (
                  <item.icon
                    className={classNames(
                      'mr-3 h-6 w-6 shrink-0 text-slate-800 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100',
                      {
                        'text-slate-900 dark:text-slate-100':
                          router.asPath === item.href,
                      },
                    )}
                    aria-hidden="true"
                  />
                )}
                <span className="flex-1 dark:text-slate-400">{item.name}</span>
              </Link>
            </div>
          ) : (
            <ChildrenNav
              key={item.name}
              item={item}
              hasRole={hasRole}
              onSelected={onClick}
            />
          ),
        )}
      </nav>
    </div>
  );
};

export default SideNav;
