import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

const TabComponent = ({ children, tabItems, defaultTab }) => {
  const router = useRouter();

  const { tab = defaultTab } = router?.query || {};
  const { formatMessage } = useIntl();
  const onTabSelected = (selectedTab) => {
    router.push({
      query: { ...router?.query, tab: selectedTab },
    });
  };

  return (
    <div className="py-6">
      <div className="lg:hidden">
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
          className="mt-1 capitalize block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          value={tab}
        >
          {tabItems.map((value) => (
            <option key={value.id} value={value.id}>
              {value?.title || value?.id}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden lg:block">
        <div className="border-b border-gray-200 al">
          <nav className="-mb-px flex space-x-6">
            {tabItems.map((option) => (
              <a
                onClick={() => onTabSelected(option.id)}
                key={option.id}
                className={` ${
                  tab === option.id &&
                  'border-purple-500 text-purple-600 cursor-pointer'
                }  whitespace-nowrap py-4 px-1 border-transparent hover:border-b-slate-300 border-b-2 font-medium text-sm cursor-pointer`}
              >
                <div className="flex space-x-1 items-center">
                  <div>{option.Icon}</div>
                  <div className="capitalize">
                    {' '}
                    {option?.title || option?.id}
                  </div>
                </div>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="text-white-500">
        {React.cloneElement(children, { selectedView: tab })}
      </div>
    </div>
  );
};

export default TabComponent;
