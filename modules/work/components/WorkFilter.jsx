import { VariableIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';

import MultipleSelect from '../../common/components/MultipleSelect';
import StatusFilter from '../../common/components/StatusFilter';
import { extractQuery } from '../../common/utils/normalizeFilterKeys';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { normalizeQuery } from '../../common/utils/utils';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED', 'DELETED'];

const WorkFilter = ({ workTypes = [] }) => {
  const { getDateFormatPattern, parseDate } = useFormatDateTime();
  const router = useRouter();
  const { formatMessage } = useIntl();

  const typeChangeHandler = (selectedTypes) => {
    const { types, ...rest } = router.query;
    if (selectedTypes?.length) {
      router.push({
        query: normalizeQuery(rest, selectedTypes?.join(','), 'types'),
      });
    } else {
      router.push({
        query: normalizeQuery(rest),
      });
    }
  };

  const onStatusChange = (currentStatuses) => {
    const { status, ...rest } = router.query;
    if (currentStatuses?.length)
      router.push({
        query: normalizeQuery(rest, currentStatuses, 'status'),
      });
    else
      router.push({
        query: rest,
      });
  };

  return (
    <>
      <div className="mb-2 justify-between py-4 sm:mb-0 lg:flex">
        <div className="sm:mr-6">
          <div className="space-x-2">
            <div className="text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:leading-6 ">
              {formatMessage({
                id: 'filter_by_creation_date',
                defaultMessage: 'Filter by creation date',
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
                onChange={(value) => {
                  if (value)
                    router.push({
                      query: normalizeQuery(
                        router.query,
                        new Date(value).toISOString(),
                        'start',
                      ),
                    });
                  else {
                    const { start, ...rest } = router.query;
                    router.push({ query: { ...rest } });
                  }
                }}
                placeholderText={formatMessage({
                  id: 'start_date',
                  defaultMessage: 'Start date',
                })}
                showMonthDropdown
                dateFormat={getDateFormatPattern()}
                showYearDropdown
                dropdownMode="select"
                selected={
                  router?.query?.start ? parseDate(router?.query?.start) : null
                }
                className="block w-full rounded-md border dark:bg-slate-800 border-slate-300 dark:border-slate-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400 sm:text-sm"
              />
              <label className="mr-2 ml-3 " htmlFor="report-end">
                {formatMessage({ id: 'to', defaultMessage: 'To' })}
              </label>
              <DatePicker
                name="endDate"
                id="work-end"
                onChange={(value) => {
                  if (value)
                    router.push({
                      query: normalizeQuery(
                        router.query,
                        new Date(value).toISOString(),
                        'end',
                      ),
                    });
                  else {
                    const { end, ...rest } = router.query;
                    router.push({ query: { ...rest } });
                  }
                }}
                placeholderText={formatMessage({
                  id: 'end_date',
                  defaultMessage: 'End Date',
                })}
                dateFormat={getDateFormatPattern()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                selected={
                  router?.query?.end
                    ? parseDate(router?.query?.end)
                    : new Date()
                }
                className="block w-full rounded-md dark:bg-slate-800 border border-slate-300 dark:border-slate-700 py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400 sm:text-sm"
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
            <p className="text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:leading-6 ">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </p>
          </div>
          <div>
            <div className="mt-4">
              <MultipleSelect
                className="text-sm text-slate-900 dark:text-slate-200"
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
          </div>
        </div>
      </div>
      <hr className="my-4 hidden w-full bg-slate-200 dark:bg-slate-700 sm:block" />
      <div>
        <p className="mt-0 text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:gap-7 lg:leading-6 ">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </p>
        <div className="m-1 mt-3 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:pr-5">
          <StatusFilter
            onStatusChange={onStatusChange}
            selectedStatuses={router.query.status}
            statuses={WORK_STATUSES}
          />
        </div>
      </div>
    </>
  );
};

export default WorkFilter;
