import { AdjustmentsIcon, VariableIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';

import MultipleSelect from './MultipleSelect';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED'];

const Filter = ({ onFilterApplied, wortkTypes = [] }) => {
  const { formatMessage } = useIntl();
  const [selectedTypes, setSelectedTypes] = useState();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [dateRange, setDateRange] = useState({
    start: new Date(0),
    end: null,
  });

  const statusChangeHandler = (e) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [e.target.name]: e.target.checked,
    });
  };

  const applyFilters = () => {
    onFilterApplied({
      dateRange,
      types: selectedTypes,
      status: Object.entries(selectedStatuses)
        .filter(([, x]) => x)
        .map(([r]) => r),
    });
    setShowFilters(false);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className=" cursor-pointer sm:flex hidden hover:bg-indigo-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 py-4 px-6 bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center "
      >
        {formatMessage({ id: 'filters', defaultMessage: 'Filters' })}
      </button>

      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="cursor-pointer mt-6 block sm:hidden hover:bg-indigo-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 py-2 w-full bg-indigo-800 flex text-base leading-4 font-normal text-white justify-center items-center"
      >
        {formatMessage({ id: 'filters', defaultMessage: 'Filters' })}
      </button>

      <div
        id="filterSection"
        className={`relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full ${
          showFilters ? 'block' : 'hidden'
        }`}
      >
        <div
          onClick={() => setShowFilters(false)}
          className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
        >
          <AdjustmentsIcon
            className=" lg:w-6 lg:h-6 w-4 h-4"
            viewBox="0 0 26 26"
            fill="white"
            stroke="white"
          />
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <div className=" flex space-x-2">
            <VariableIcon
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            />
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
              <div className=" flex justify-center items-center">
                <MultipleSelect
                  tagList={selectedTypes}
                  onChange={setSelectedTypes}
                  options={wortkTypes.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
            {formatMessage({ id: 'status', defaultMessage: 'Status' })}
          </p>

          <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap">
            {WORK_STATUSES.map((status) => (
              <div className=" flex md:justify-center md:items-center items-center">
                <input
                  className="w-4 h-4 mr-2"
                  type="checkbox"
                  id={status}
                  name={status}
                  value={status}
                  checked={selectedStatuses[status]}
                  onChange={statusChangeHandler}
                />
                <div className=" inline-block">
                  <div className=" flex space-x-6 justify-center items-center">
                    <label
                      className=" mr-2 text-sm leading-3 font-normal text-gray-600"
                      htmlFor={status}
                    >
                      {status}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        <div>
          <div className=" flex space-x-2">
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              {formatMessage({
                id: 'date_range',
                defaultMessage: 'Date range',
              })}
            </p>
          </div>
          <div className=" flex mt-8 space-x-8">
            <div className=" flex justify-center items-center">
              <span>
                {formatMessage({
                  id: 'from',
                  defaultMessage: 'From',
                })}{' '}
              </span>
              <DatePicker
                name="startDate"
                onChange={(start) => setDateRange({ ...dateRange, start })}
                placeholderText="Start date"
                dateFormat="dd.MM.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={dateRange.start}
                showTimeInput
              />
              <span>
                {formatMessage({
                  id: 'to',
                  defaultMessage: 'To',
                })}
              </span>
              <DatePicker
                name="endDate"
                onChange={(end) => setDateRange({ ...dateRange, end })}
                placeholderText="End Date"
                value={new Date()}
                dateFormat="dd.MM.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={dateRange.end}
                showTimeInput
              />
            </div>
          </div>
        </div>

        <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6">
          <button
            type="button"
            onClick={applyFilters}
            className="w-full hover:bg-indigo-700 focus:ring focus:ring-offset-2 focus:ring-indigo-800 text-base leading-4 font-medium py-4 px-10 text-white bg-indigo-800"
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

export default Filter;
