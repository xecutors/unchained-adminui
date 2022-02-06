import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import SyncReportList from '../../../modules/sync/components/SyncReportList';
import useWorkQueue from '../../../modules/work/hooks/useWorkQueue';
import ListPagination from '../../../modules/common/components/ListPagination';
import { DefaultLimit } from '../../../modules/common/data/miscellaneous';

const SyncReport = () => {
  const [start, setStartDate] = useState(new Date(0));
  const [end, setEndDate] = useState(new Date());
  const [limit, setLimit] = useState(DefaultLimit);

  const { workQueue, loadMore } = useWorkQueue({
    selectTypes: ['PUBLICARE_DAILY_ANALYTICS'],
    status: ['SUCCESS', 'FAILED'],
    created: { start, end },
    limit,
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
      <div className="border mt-4 border-gray-50 shadow bg-white rounded-md ">
        <div className="flex py-5 max-w-sm justify-between items-center">
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
            className=" sm:ml-1 hover:border-indigo-500  text-sm sm:mt-0 w-full border-gray-200 rounded-md py-1"
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
            className="sm:ml-1 text-sm hover:border-indigo-500 sm:mt-0 w-full border-gray-200 rounded-md py-1"
          />
        </div>
        <hr />
        <SyncReportList data={workQueue} />
        <ListPagination
          data={workQueue}
          limit={limit}
          onLimitChange={setLimit}
          onLoadMore={loadMore}
        />
      </div>
    </>
  );
};

export default SyncReport;
