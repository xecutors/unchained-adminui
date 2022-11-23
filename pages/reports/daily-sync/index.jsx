import React from 'react';
import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import SyncReportList from '../../../modules/sync/components/SyncReportList';
import useDailySyncs from '../../../modules/sync/hooks/useDailySyncs';
import Pagination from '../../../modules/common/components/Pagination';
import { DefaultLimit } from '../../../modules/common/data/miscellaneous';
import Loading from '../../../modules/common/components/Loading';
import useFormatDateTime from '../../../modules/common/utils/useFormatDateTime';
import { normalizeQuery } from '../../../modules/common/utils/utils';

const SyncReport = () => {
  const router = useRouter();

  const { getDateFormatPattern, parseDate } = useFormatDateTime();

  const { dailySync, loadMore, loading } = useDailySyncs({
    start: router?.query?.start,
    end: router?.query?.end,
    limit: parseInt(router.query?.limit || DefaultLimit, 10),
  });
  const { formatMessage } = useIntl();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'daily_sync',
          defaultMessage: 'Daily sync',
        })}
      />
      <div className="mt-4 rounded-md border border-slate-50">
        <div className="flex max-w-sm items-center justify-between py-5">
          <label className="ml-4 mr-2" htmlFor="report-start">
            {formatMessage({ id: 'from', defaultMessage: 'From' })}
          </label>
          <DatePicker
            onChange={(value) => {
              router.push({
                query: normalizeQuery(
                  router.query,
                  new Date(value).toISOString(),
                  'start',
                ),
              });
            }}
            dateFormat={getDateFormatPattern()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            id="report-start"
            placeholderText="Start date"
            selected={
              router?.query?.start ? parseDate(router?.query?.start) : null
            }
            className="w-full rounded-md dark:text-slate-200 dark:bg-slate-500 border-slate-200 dark:border-slate-800 py-1 text-sm hover:border-indigo-500 sm:ml-1 sm:mt-0"
          />
          <label className="mr-2 ml-3 " htmlFor="report-end">
            {formatMessage({ id: 'to', defaultMessage: 'To' })}
          </label>
          <DatePicker
            dateFormat={getDateFormatPattern()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            onChange={(value) =>
              router.push({
                query: normalizeQuery(
                  router.query,
                  new Date(value).toISOString(),
                  'end',
                ),
              })
            }
            id="report-end"
            dropdownMode="select"
            placeholderText="Start date"
            selected={
              router?.query?.end ? parseDate(router?.query?.end) : new Date()
            }
            className="w-full rounded-md dark:text-slate-200 dark:bg-slate-500 border-slate-200 dark:border-slate-800 py-1 text-sm hover:border-indigo-500 sm:ml-1 sm:mt-0"
          />
        </div>
        {loading ? <Loading /> : <SyncReportList data={dailySync} />}
        <Pagination
          onLoadMore={loadMore}
          limit={router.query?.limit || DefaultLimit}
          onLimitChange={(limit) => router.push({ query: { limit } })}
          data={dailySync}
        />
      </div>
    </>
  );
};

export default SyncReport;
