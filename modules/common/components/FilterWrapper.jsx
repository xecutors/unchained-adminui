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
    <div className="2xl:container 2xl:mx-auto">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className=" cursor-pointer sm:flex hidden hover:bg-indigo-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 py-4 px-6 bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center "
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
        className="cursor-pointer mt-6 block sm:hidden hover:bg-indigo-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 py-2 w-full bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center"
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
        <hr className=" bg-gray-200 w-full  my-3" />
        {children}
        <hr className=" bg-gray-200 w-full  my-3" />

        <div className="relative px-0 mt-5 w-full md:w-auto md:mt-0  md:bottom-0 md:py-10 lg:px-20 md:px-6">
          <button
            type="button"
            onClick={applyFilters}
            className=" hover:bg-indigo-700 w-full focus:ring md:absolute right-0 focus:ring-offset-2 focus:ring-indigo-800 text-base leading-4 font-medium py-4 px-10 text-white bg-indigo-800"
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
