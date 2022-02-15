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
    <div className="w-full m-5">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="cursor-pointer sm:flex hidden hover:bg-indigo-700 rounded-md py-2 px-10 bg-indigo-500 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        <AdjustmentsIcon
          className=" lg:w-6 lg:h-6 w-4 h-4"
          viewBox="0 0 26 26"
          fill="white"
          stroke="white"
        />{' '}
        {formatMessage({ id: 'filters', defaultMessage: 'Filters' })}
      </button>

      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="cursor-pointer mt-6 block sm:hidden rounded-md hover:bg-indigo-700 focus:ring-offset-2 py-2 w-full bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        <AdjustmentsIcon
          className="lg:w-6 lg:h-6 w-4 h-4"
          viewBox="0 0 26 26"
          fill="white"
          stroke="white"
        />{' '}
        {formatMessage({ id: 'filters', defaultMessage: 'Filters' })}
      </button>

      <div
        className={classNames('', className, {
          hidden: !showFilters,
        })}
      >
        {children}
        <hr className="bg-gray-200 w-full" />

        <div className="relative px-0 mt-2 md:w-auto md:mt-4 md:bottom-0 md:pb-10 lg:px-20 md:px-6">
          <button
            type="button"
            onClick={applyFilters}
            className="rounded relative inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:absolute right-0"
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
