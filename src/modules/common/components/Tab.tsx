import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { useIntl } from 'react-intl';

const Tab = ({ children, tabItems, defaultTab, updateRoute = true }) => {
  const router = useRouter();

  const { tab = defaultTab } = router?.query || {};
  const { formatMessage } = useIntl();
  const onTabSelected = (selectedTab) => {
    if (updateRoute) {
      const { sort, ...queryWithoutSort } = router?.query || {};
      router.push(
        {
          query: { ...queryWithoutSort, tab: selectedTab },
        },
        undefined,
        {
          shallow: true,
        },
      );
    }
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
          className="mt-1 block dark:bg-slate-800 dark:text-white w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base capitalize  focus:outline-hidden focus:ring-slate-800 sm:text-sm"
          value={tab}
        >
          {tabItems.filter(Boolean).map((value) => (
            <option key={value.id} value={value.id} className="dark:text-white">
              {value?.title || value?.id}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5 hidden lg:block">
        <div className="">
          <nav className="flex flex-wrap gap-6">
            {tabItems.filter(Boolean).map((option) => (
              <a
                id={option.id}
                key={option.id}
                onClick={() => onTabSelected(option.id)}
                className={classNames(
                  {
                    'cursor-pointer rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 text-slate-900 dark:text-slate-100 dark:bg-slate-700 shadow-md':
                      tab === option.id,
                  },
                  'cursor-pointer relative whitespace-nowrap border border-transparent py-4 px-1 pr-3 pl-2 text-sm dark:text-slate-400 font-medium dark:hover:bg-slate-700 hover:border-slate-300 hover:rounded-lg',
                )}
              >
                <div className="flex items-center space-x-1">
                  <div>{option.Icon}</div>
                  <div className="capitalize">
                    {option?.title || option?.id}
                  </div>
                  {option?.length ? (
                    <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-slate-400 px-1 py-0.5 text-sm leading-none text-slate-900">
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

export default Tab;
