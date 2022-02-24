import { VariableIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';
import FilterWrapper from '../../common/components/FilterWrapper';
import MultipleSelect from '../../common/components/MultipleSelect';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED', 'DELETED'];
const extractQuery = (query) => {
  return decodeURIComponent(query || [])
    .split(',')
    .filter(Boolean);
};

const arrayToBooleanObject = (key, val) => ({ ...key, [val]: true });
const WorkFilter = ({ workTypes = [] }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const [selectedTypes, setSelectedTypes] = useState(
    extractQuery(router.query?.types),
  );

  const [dateRange, setDateRange] = useState({
    start: new Date(0).getTime(),
    end: new Date().getTime(),
  });

  const [selectedStatuses, setSelectedStatuses] = useState(
    extractQuery(router.query?.status).reduce(arrayToBooleanObject, {}),
  );

  const statusChangeHandler = (e) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [e.target.name]: e.target.checked,
    });
  };
  const onApplyFilter = () => {
    return {
      ...dateRange,
      types: selectedTypes,
      status: Object.entries(selectedStatuses)
        .filter(([, isChecked]) => isChecked)
        .map(([key]) => key)
        ?.filter(Boolean),
    };
  };

  return (
    <FilterWrapper
      className="bg-white shadow my-2 p-6 "
      onApplyFilter={onApplyFilter}
    >
      <div className="lg:flex mb-2 sm:mb-0 justify-between">
        <div className="sm:mr-6">
          <div className=" flex space-x-2">
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              {formatMessage({
                id: 'date_range',
                defaultMessage: 'Date range',
              })}
            </p>
          </div>
          <div className="mt-5 max:mb-3 ">
            <div className="flex justify-center items-center">
              <label className="ml-1 mr-2" htmlFor="work-start">
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

        <div className="flex-1 w-md">
          <div className="mt-4 sm:mt-1 lg:mt-1 md:mt-5 flex space-x-2">
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
          <div>
            <>
              <div className="py-1  ">
                <MultipleSelect
                  className="text-sm text-gray-900  "
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
            </>
          </div>
        </div>
      </div>
      <hr className=" bg-gray-200  w-full hidden sm:block  my-4" />

      <div>
        <p className=" mt-0 lg:text-2xl text-xl lg:leading-6 lg:gap-7 leading-5 font-medium text-gray-800 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5 mt-3 m-1 ">
          {WORK_STATUSES.map((status) => (
            <div className="flex justify-start m-2">
              <input
                className="w-4 h-4 mr-2 "
                type="checkbox"
                id={status}
                name={status}
                value={status}
                checked={selectedStatuses?.[status]}
                onChange={statusChangeHandler}
              />
              <div className="mr-2">
                <div className="flex">
                  <label className=" text-sm text-gray-600" htmlFor={status}>
                    {status}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FilterWrapper>
  );
};

export default WorkFilter;
