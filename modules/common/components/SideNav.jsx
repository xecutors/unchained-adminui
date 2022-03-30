import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';

const SideNav = ({ navigation }) => {
  return (
    <div className="mt-1 flex flex-grow flex-col">
      <h1 className="font-bold text-indigo-500 text-md mb-4 bg-white px-2 lg:px-4 2xl:px-6">
        Admin UI
      </h1>
      <nav
        className="flex-1 space-y-1 bg-white px-2 lg:px-4 2xl:px-6"
        aria-label="Sidebar"
      >
        {navigation.map((item) =>
          !item.children ? (
            <div key={item.name}>
              <Link href={item?.href || '#'}>
                <a
                  className={classNames(
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex w-full items-center rounded-md py-2 pl-2 text-sm font-medium',
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-indigo-500'
                        : 'text-indigo-400 group-hover:text-indigo-500',
                      'mr-3 h-6 w-6 flex-shrink-0',
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
                      'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400',
                    )}
                  >
                    <item.icon
                      className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-400 group-hover:text-indigo-500"
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                    <svg
                      className={classNames(
                        open ? 'rotate-90 text-indigo-400' : 'text-indigo-300',
                        'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
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
                        <a className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
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

export default SideNav;
