import { VariableIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';

import MultipleSelect from '../../common/components/MultipleSelect';
import normalizeFilterKeys, {
  extractQuery,
} from '../../common/utils/normalizeFilterKeys';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED', 'DELETED'];

const WorkFilter = ({ workTypes = [] }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const [selectedTypes, setSelectedTypes] = useState(
    extractQuery(router.query?.types),
  );

  const [dateRange, setDateRange] = useState({
    start: new Date(0),
    end: new Date(),
  });

  const [selectedStatuses, setSelectedStatuses] = useState(
    extractQuery(router.query?.status),
  );

  const statusChangeHandler = (e) => {
    if (e.target.checked) {
      setSelectedStatuses([...selectedStatuses, e.target.name]);
    } else {
      setSelectedStatuses([
        ...selectedStatuses.filter((v) => v !== e.target.value),
      ]);
    }
  };

  useEffect(() => {
    const filterQuery = normalizeFilterKeys({
      ...dateRange,
      types: selectedTypes,
      status: selectedStatuses,
    });

    router.push(`${router.pathname}?${filterQuery}`);
  }, [dateRange, selectedTypes, selectedStatuses]);

  return (
    <>
      <div className="mb-2 justify-between p-4 sm:mb-0 lg:flex">
        <div className="sm:mr-6">
          <div className="flexspace-x-2">
            <div className="text-xl font-medium leading-5 text-gray-800 lg:leading-6 ">
              {formatMessage({
                id: 'date_range',
                defaultMessage: 'Date range',
              })}
            </div>
          </div>
          <div className="max:mb-3 mt-5 ">
            <div className="flex items-center justify-center">
              <label className="ml-1 mr-2" htmlFor="work-start">
                {formatMessage({ id: 'from', defaultMessage: 'From' })}
              </label>
              <DatePicker
                name="startDate"
                id="work-start"
                onChange={(value) =>
                  setDateRange({
                    ...dateRange,
                    start: new Date(value),
                  })
                }
                placeholderText="Start date"
                dateFormat="dd.MM.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={dateRange.start}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <label className="mr-2 ml-3 " htmlFor="report-end">
                {formatMessage({ id: 'to', defaultMessage: 'To' })}
              </label>
              <DatePicker
                name="endDate"
                id="work-end"
                onChange={(value) =>
                  setDateRange({
                    ...dateRange,
                    end: new Date(value),
                  })
                }
                placeholderText="End Date"
                value={new Date()}
                dateFormat="dd.MM.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={dateRange.end}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="w-md flex-1">
          <div className="mt-4 flex space-x-2 sm:mt-1 md:mt-5 lg:mt-1">
            <VariableIcon
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            />
            <p className="text-xl font-medium leading-5 text-gray-800 lg:leading-6 ">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </p>
          </div>
          <div>
            <>
              <div className="py-1">
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
      <hr className=" my-4  hidden w-full bg-gray-200  sm:block" />

      <div className="p-4 pt-0">
        <p className="mt-0 text-xl font-medium leading-5 text-gray-800 lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="m-1 mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          {WORK_STATUSES.map((status) => (
            <div className="mr-2 flex items-center justify-start" key={status}>
              <input
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                type="checkbox"
                id={status}
                name={status}
                value={status}
                checked={selectedStatuses.includes(status)}
                onChange={statusChangeHandler}
              />
              <div className="ml-2">
                <label className="text-sm text-gray-600" htmlFor={status}>
                  {status}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkFilter;
