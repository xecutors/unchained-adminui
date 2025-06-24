import { VariableIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import MultipleSelect from '../../common/components/MultipleSelect';
import StatusFilter from '../../common/components/StatusFilter';
import { extractQuery } from '../../common/utils/normalizeFilterKeys';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import { normalizeQuery } from '../../common/utils/utils';
import DateInputField from '../../common/components/DateInput';

const WORK_STATUSES = ['NEW', 'ALLOCATED', 'SUCCESS', 'FAILED', 'DELETED'];

const WorkFilter = ({ workTypes = [] }) => {
  const { parseDate } = useFormatDateTime();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const appliedStatuses = extractQuery(router.query.status);
  const appliedTypes = extractQuery(router.query.types);

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
      <div className="mt-5 text-md text-slate-600 dark:text-slate-200">
        {formatMessage({
          id: 'filter_by_creation_date',
          defaultMessage: 'Filter by creation date',
        })}
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-center">
          <label className="ml-1 mr-2" htmlFor="work-start">
            {formatMessage({ id: 'from', defaultMessage: 'From' })}
          </label>
          <DateInputField
            id="work-start"
            onChange={(value: any) => {
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
            placeholder={formatMessage({
              id: 'start_date',
              defaultMessage: 'Start date',
            })}
            value={
              router?.query?.start ? parseDate(router?.query?.start) : null
            }
            containerClassName="w-full rounded-md border dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-slate-800 sm:text-sm"
          />
          <label className="mr-2 ml-3 " htmlFor="report-end">
            {formatMessage({ id: 'to', defaultMessage: 'To' })}
          </label>
          <DateInputField
            id="work-end"
            onChange={(value: any) => {
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
            placeholder={formatMessage({
              id: 'end_date',
              defaultMessage: 'End Date',
            })}
            value={
              router?.query?.end
                ? parseDate(router?.query?.end)
                : parseDate(new Date())
            }
            containerClassName="w-full rounded-md border dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:outline-hidden focus:ring-slate-800 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-5">
        <MultipleSelect
          label={formatMessage({
            id: 'select_type',
            defaultMessage: 'Select type',
          })}
          tagList={appliedTypes}
          onChange={typeChangeHandler}
          options={workTypes.map((type) => ({
            label: type,
            value: type,
          }))}
        />
      </div>

      <div className="mt-5">
        <div className="text-md text-slate-800 dark:text-slate-200">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </div>
        <div className="flex flex-wrap gap-5">
          <StatusFilter
            onStatusChange={onStatusChange}
            selectedStatuses={appliedStatuses}
            statuses={WORK_STATUSES}
          />
        </div>
      </div>
    </>
  );
};

export default WorkFilter;
