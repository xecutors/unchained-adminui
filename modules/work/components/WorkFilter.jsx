import { VariableIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';

import MultipleSelect from '../../common/components/MultipleSelect';
import { extractQuery } from '../../common/utils/normalizeFilterKeys';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED', 'DELETED'];

const WorkFilter = ({ workTypes = [] }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const typeChangeHandler = (selectedTypes) => {
    const { types, ...rest } = router.query;
    if (selectedTypes?.length) {
      router.push({
        query: {
          ...rest,
          types: selectedTypes?.join(','),
        },
      });
    } else {
      router.push({
        query: {
          ...rest,
        },
      });
    }
  };

  const statusChangeHandler = (e) => {
    const { status, ...rest } = router.query;

    if (e.target.checked) {
      const newStatus = [...extractQuery(status), e.target.name];
      router.push({
        query: {
          ...rest,
          status:
            newStatus.length === 1 && e.target.value === 'DELETED'
              ? WORK_STATUSES.join(',')
              : newStatus?.join(','),
        },
      });
    } else {
      const newStatus = [...extractQuery(status)].filter(
        (v) => v !== e.target.value,
      );

      if (newStatus.length)
        router.push({
          query: {
            ...router.query,
            status: newStatus?.join(','),
          },
        });
      // initial query or to replicate the behavior in the engine when no status is selected
      else
        router.push({
          query: {
            ...rest,
            status: WORK_STATUSES.filter(
              (stat) => stat !== e.target.value && stat !== 'DELETED',
            ).join(','),
          },
        });
    }
  };

  return (
    <>
      <div className="mb-2 justify-between py-4 sm:mb-0 lg:flex">
        <div className="sm:mr-6">
          <div className="space-x-2">
            <div className="text-xl font-medium leading-5 text-slate-800 dark:text-white lg:leading-6 ">
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
                  router.push({
                    query: {
                      ...router.query,
                      start: format(new Date(value), 'MM.dd.yyyy'),
                    },
                  })
                }
                placeholderText="Start date"
                dateFormat="MM.dd.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={
                  router?.query?.start
                    ? new Date(router?.query?.start)
                    : new Date(0)
                }
                className="block w-full rounded-md border dark:bg-slate-600 border-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
              <label className="mr-2 ml-3 " htmlFor="report-end">
                {formatMessage({ id: 'to', defaultMessage: 'To' })}
              </label>
              <DatePicker
                name="endDate"
                id="work-end"
                onChange={(value) =>
                  router.push({
                    query: {
                      ...router.query,
                      end: format(new Date(value), 'MM.dd.yyyy'),
                    },
                  })
                }
                placeholderText="End Date"
                dateFormat="MM.dd.yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={
                  router?.query?.end ? new Date(router?.query?.end) : new Date()
                }
                className="block w-full rounded-md dark:bg-slate-600 border border-slate-300 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="w-md flex-1">
          <div className="mt-4 flex space-x-2 sm:mt-1 md:mt-5 lg:mt-0">
            <VariableIcon
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            />
            <p className="text-xl font-medium leading-5 text-slate-800 dark:text-white lg:leading-6 ">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </p>
          </div>
          <div>
            <>
              <div className="mt-4">
                <MultipleSelect
                  className="text-sm text-slate-900 dark:text-white"
                  label={formatMessage({
                    id: 'select_type',
                    defaultMessage: 'Select type',
                  })}
                  tagList={extractQuery(router.query?.types)}
                  onChange={typeChangeHandler}
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
      <hr className="my-4 hidden w-full bg-slate-200 sm:block" />

      <div>
        <p className="mt-0 text-xl font-medium leading-5 text-slate-800 dark:text-white lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="m-1 mt-3 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          {WORK_STATUSES.map((status) => (
            <div
              className="inline-flex items-center rounded-md bg-white dark:bg-slate-500 py-2 px-4 text-sm font-medium text-indigo-800 shadow-sm dark:shadow-white"
              key={status}
            >
              <input
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
                type="checkbox"
                id={status}
                name={status}
                value={status}
                checked={
                  extractQuery(router.query?.status).includes(status) ||
                  (extractQuery(router.query?.status).length === 0 &&
                    status !== 'DELETED')
                }
                onChange={statusChangeHandler}
              />
              <div className="ml-2">
                <label
                  className="text-sm text-slate-600 dark:text-white"
                  htmlFor={status}
                >
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
