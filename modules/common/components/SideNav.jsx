import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';

const ChildrenNav = ({ item, hasRole, onSelected }) => {
  const router = useRouter();

  return item.children?.some(
    (d) => !d?.requiredRole || hasRole(d?.requiredRole),
  ) ? (
    <Disclosure as="div" key={item.name} className="space-y-1">
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex w-full dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400',
            )}
          >
            <item.icon
              className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-400 group-hover:text-indigo-500"
              aria-hidden="true"
            />
            <span className="flex-1 dark:text-white">{item.name}</span>
            <svg
              className={classNames(
                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-slate-400 text-indigo-300',
                {
                  'rotate-90 text-indigo-400': open,
                },
              )}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
            </svg>
          </Disclosure.Button>
          <Disclosure.Panel className="space-y-1" onClick={onSelected}>
            {item.children
              .filter((f) => !f?.requiredRole || hasRole(f.requiredRole))
              .map((subItem) => (
                <Link key={subItem.name} href={subItem.href}>
                  <a
                    className={classNames(
                      'group  flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-400 hover:text-slate-900',
                      {
                        ' dark:bg-slate-400 text-slate-900 dark:text-white bg-slate-200':
                          router.asPath === subItem.href,
                      },
                    )}
                  >
                    {subItem.name}
                  </a>
                </Link>
              ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  ) : null;
};

const SideNav = ({ navigation, onClick = () => true }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const router = useRouter();

  return (
    <div className="mt-1 flex flex-grow flex-col dark:bg-slate-600">
      <h1 className="text-md mb-4 bg-white dark:bg-slate-600 px-2 font-bold text-indigo-500 dark:text-white lg:px-4 2xl:px-6 ">
        {formatMessage({ id: 'admin_ui', defaultMessage: 'Admin UI' })}
      </h1>
      <nav
        className="flex-1 space-y-1 bg-white dark:bg-slate-600 px-2 lg:px-4 2xl:px-6"
        aria-label="Sidebar"
      >
        {navigation.map((item) =>
          !item.children &&
          (!item.requiredRole || hasRole(item.requiredRole)) ? (
            <div key={item.name} onClick={onClick}>
              <Link href={item?.href || '#'}>
                <a
                  className={classNames(
                    'group flex w-full dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500 items-center rounded-md py-2 pl-2 text-sm font-medium ',
                    {
                      ' dark:bg-slate-400 text-slate-900 dark:text-white bg-slate-200':
                        router.asPath === item.href,
                    },
                  )}
                >
                  <item.icon
                    className={classNames(
                      'mr-3 h-6 w-6 flex-shrink-0 text-indigo-400 group-hover:text-indigo-500',
                      {
                        'text-indigo-500 ': router.asPath === item.href,
                      },
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
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
