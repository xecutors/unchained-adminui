import { useIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import SyncReportList from '../../../modules/sync/components/SyncReportList';
import useDailySyncs from '../../../modules/sync/hooks/useDailySyncs';

const SyncReport = () => {
  const [start, setStartDate] = useState(new Date(0));
  const [end, setEndDate] = useState(new Date());

  const { dailySync } = useDailySyncs({
    start,
    end,
  });
  const { formatMessage } = useIntl();

  return (
    <div className="p-5">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'daily_sync',
          defaultMessage: 'Daily sync',
        })}
      />
      <div className="flex justify-between">
        <label htmlFor="report-start">
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
        />
        <label htmlFor="report-end">
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
        />
      </div>
      <SyncReportList data={dailySync} />
    </div>
  );
};

export default SyncReport;
