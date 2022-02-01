import { AdjustmentsIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const FilterWrapper = ({ onApplyFilter, children, className }) => {
  const { formatMessage } = useIntl();

  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    onApplyFilter();
    setShowFilters(false);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className=" cursor-pointer sm:flex hidden hover:bg-indigo-700 rounded-md  py-2 px-10 bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center "
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
        className="cursor-pointer mt-6 block sm:hidden rounded-md hover:bg-indigo-700  focus:ring-offset-2 py-2 w-full bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        <AdjustmentsIcon
          className=" lg:w-6 lg:h-6 w-4 h-4"
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
        <hr className=" bg-gray-200 w-full" />

        <div className="relative px-0 mt-2 md:w-auto md:mt-0  md:bottom-0 md:py-10 lg:px-20 md:px-6">
          <button
            type="button"
            onClick={applyFilters}
            className="justify-center sm:w-48 w-full text-center hover:bg-indigo-700 rounded-md sm:mr-10 flex items-center md:absolute right-0 text-base leading-4 font-medium px-4  py-2 text-white bg-indigo-800"
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
