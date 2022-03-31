import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import SyncReportList from '../../../modules/sync/components/SyncReportList';
import useDailySyncs from '../../../modules/sync/hooks/useDailySyncs';
import Pagination from '../../../modules/common/components/Pagination';
import { DefaultLimit } from '../../../modules/common/data/miscellaneous';
import Loading from '../../../modules/common/components/Loading';

const SyncReport = () => {
  const [start, setStartDate] = useState(new Date(0));
  const [end, setEndDate] = useState(new Date());
  const [limit, setLimit] = useState(DefaultLimit);

  const { dailySync, loadMore, loading } = useDailySyncs({
    start,
    end,
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
      <div className="mt-4 rounded-md border border-slate-50 ">
        <div className="flex max-w-sm items-center justify-between py-5">
          <label className="ml-4 mr-2" htmlFor="report-start">
            {formatMessage({ id: 'from', defaultMessage: 'From' })}
          </label>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            onMonthChange={(date) => setStartDate(date)}
            onYearChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            id="report-start"
            placeholderText="Start date"
            selected={start}
            className=" w-full rounded-md  border-gray-200 py-1 text-sm hover:border-indigo-500 sm:ml-1 sm:mt-0"
          />
          <label className="mr-2 ml-3 " htmlFor="report-end">
            {formatMessage({ id: 'to', defaultMessage: 'To' })}
          </label>
          <DatePicker
            onChange={(date) => setEndDate(date)}
            onMonthChange={(date) => setEndDate(date)}
            onYearChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            id="report-end"
            dropdownMode="select"
            placeholderText="Start date"
            selected={end}
            className="w-full rounded-md border-gray-200 py-1 text-sm hover:border-indigo-500 sm:ml-1 sm:mt-0"
          />
        </div>
        {loading ? <Loading /> : <SyncReportList data={dailySync} />}
        <Pagination
          onLoadMore={loadMore}
          limit={limit}
          onLimitChange={setLimit}
          data={dailySync}
        />
      </div>
    </>
  );
};

export default SyncReport;
