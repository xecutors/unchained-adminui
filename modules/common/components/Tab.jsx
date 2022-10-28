import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { useIntl } from 'react-intl';

const TabComponent = ({
  children,
  tabItems,
  defaultTab,
  updateRoute = true,
}) => {
  const router = useRouter();

  const { tab = defaultTab } = router?.query || {};
  const { formatMessage } = useIntl();
  const onTabSelected = (selectedTab) => {
    if (updateRoute)
      router.push(
        {
          query: { ...router?.query, tab: selectedTab },
        },
        undefined,
        {
          shallow: true,
        },
      );
  };

  return (
    <div className="py-6">
      <div className="mb-5 lg:hidden">
        <label htmlFor="selected-tab" className="sr-only">
          {formatMessage({
            id: 'select_tab',
            defaultMessage: 'Select a tab',
          })}
        </label>

        <select
          onChange={(e) => onTabSelected(e.target.value)}
          id="selected-tab"
          name="selected-tab"
          className="mt-1 block dark:bg-slate-800 dark:text-white w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base capitalize focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
          value={tab}
        >
          {tabItems.map((value) => (
            <option key={value.id} value={value.id} className="dark:text-white">
              {value?.title || value?.id}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5 hidden lg:block">
        <div className="al border-b border-indigo-100 dark:border-slate-700">
          <nav className="-mb-px flex flex-wrap gap-6">
            {tabItems.map((option) => (
              <a
                id={option.id}
                key={option.id}
                onClick={() => onTabSelected(option.id)}
                className={classNames(
                  {
                    'cursor-pointer rounded-t-lg border border-indigo-200 dark:border-slate-700 border-b-indigo-500 dark:border-b-indigo-500 bg-indigo-100 text-indigo-800 dark:text-slate-200 dark:bg-slate-500':
                      tab === option.id,
                  },
                  'cursor-pointer relative whitespace-nowrap border border-b-2 border-transparent py-4 px-1 pr-3 pl-2 text-sm dark:text-slate-400 font-medium dark:hover:bg-slate-500 hover:border-b-indigo-500 hover:rounded-t-lg',
                )}
              >
                <div className="flex items-center space-x-1">
                  <div>{option.Icon}</div>
                  <div className="capitalize">
                    {option?.title || option?.id}
                  </div>
                  {option?.length ? (
                    <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-indigo-300 px-1 py-0.5 text-sm leading-none text-slate-900">
                      {option?.length}
                    </span>
                  ) : null}
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="text-white">
        {React.cloneElement(children, { selectedView: tab })}
      </div>
    </div>
  );
};

export default TabComponent;
