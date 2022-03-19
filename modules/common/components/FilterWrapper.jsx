import { AdjustmentsIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const FilterWrapper = ({ onApplyFilter, children, className }) => {
  const { formatMessage } = useIntl();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    const filters = onApplyFilter();

    const output = Object.keys(filters)
      .map((key) => {
        console.log(key, Array.isArray(filters[key]));
        const valueIsArray = Array.isArray(filters[key])
          ? filters[key].join(',')
          : filters[key];
        return `${encodeURIComponent(key)}=${valueIsArray}`;
      })
      .join('&');
    router.push(`${router.pathname}?${output}`);
    setShowFilters(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="cursor-pointer sm:flex hidden hover:bg-indigo-700 rounded-md py-2 px-10 bg-indigo-500 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        <AdjustmentsIcon
          className="mr-2 lg:w-6 lg:h-6 w-4 h-4"
          viewBox="0 0 26 26"
          fill="white"
          stroke="white"
        />
        {formatMessage({ id: 'filters', defaultMessage: 'Filters' })}
      </button>

      <div
        className={classNames('', className, {
          hidden: !showFilters,
        })}
      >
        {children}

        <div className="text-right bg-gray-50 p-4">
          <button
            type="button"
            onClick={applyFilters}
            className="rounded inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formatMessage({
              id: 'apply_filter',
              defaultMessage: 'Apply Filter',
            })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterWrapper;
