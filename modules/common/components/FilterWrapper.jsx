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
        className="flex hidden cursor-pointer items-center justify-center rounded-md bg-indigo-500 py-2 px-10 text-base font-normal leading-4 text-white hover:bg-indigo-700 sm:flex"
      >
        <AdjustmentsIcon
          className="mr-2 h-4 w-4 lg:h-6 lg:w-6"
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

        <div className="bg-gray-50 p-4 text-right">
          <button
            type="button"
            onClick={applyFilters}
            className="inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
