import { VariableIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';
import FilterWrapper from '../../common/components/FilterWrapper';
import MultipleSelect from '../../common/components/MultipleSelect';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED'];

const WorkFilter = ({ workTypes = [], onFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState();
  const { formatMessage } = useIntl();

  const [dateRange, setDateRange] = useState({
    start: new Date(0).getTime(),
    end: null,
  });
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const statusChangeHandler = (e) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [e.target.name]: e.target.checked,
    });
  };
  const onApplyFilter = () => {
    onFilter({
      dateRange,
      types: selectedTypes,
      status: Object.entries(selectedStatuses)
        .filter(([, isChecked]) => isChecked)
        .map(([key]) => key),
    });
  };
  return (
    <FilterWrapper
      className="flex-col bg-white shadow mb-2 p-6"
      onApplyFilter={onApplyFilter}
    >
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
                label={formatMessage({
                  id: 'select_type',
                  defaultMessage: 'Select type',
                })}
                tagList={selectedTypes}
                onChange={setSelectedTypes}
                options={workTypes.map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className=" bg-gray-200  w-full  my-8" />

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

      <hr className=" bg-gray-200  w-full  my-8" />

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
            <label className="ml-4 mr-2" htmlFor="work-start">
              {formatMessage({ id: 'from', defaultMessage: 'From' })}
            </label>
            <DatePicker
              name="startDate"
              id="work-start"
              onChange={(value) =>
                setDateRange({ ...dateRange, start: value.getTime() })
              }
              placeholderText="Start date"
              dateFormat="dd.MM.yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={dateRange.start}
              className=" sm:ml-1 hover:border-indigo-500  text-sm sm:mt-0 w-full border-gray-200 rounded-md py-1"
            />
            <label className="mr-2 ml-3 " htmlFor="report-end">
              {formatMessage({ id: 'to', defaultMessage: 'To' })}
            </label>
            <DatePicker
              name="endDate"
              id="work-end"
              onChange={(value) =>
                setDateRange({ ...dateRange, end: value.getTime() })
              }
              placeholderText="End Date"
              value={new Date()}
              dateFormat="dd.MM.yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={dateRange.end}
              className=" sm:ml-1 hover:border-indigo-500  text-sm sm:mt-0 w-full border-gray-200 rounded-md py-1"
            />
          </div>
        </div>
      </div>
    </FilterWrapper>
  );
};

export default WorkFilter;
