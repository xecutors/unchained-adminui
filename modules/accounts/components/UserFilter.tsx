import React from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

enum UserVerificationFilter {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

const UserFilter: React.FC = () => {
  const { getDateFormatPattern, parseDate } = useFormatDateTime();
  const router = useRouter();
  const { formatMessage } = useIntl();

  const updateQuery = (field: string, value: any) => {
    if (value)
      router.push({
        query: {
          ...router.query,
          [field]: value,
        },
      });
    else if (!value && router.query?.[field]) {
      let newQuery = router.query;
      delete newQuery[field];
      router.push({
        query: {
          ...newQuery,
        },
      });
    }
  };

  return (
    <>
      <div className="mb-4 lg:flex lg:justify-between py-4">
        <div className="flex-1  mr-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formatMessage({
              id: 'verification_status',
              defaultMessage: 'Verification Status',
            })}
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            defaultValue={router.query?.verificationStatus || ''}
            onChange={(e) => updateQuery('verificationStatus', e.target.value)}
          >
            <option value="">
              {formatMessage({
                id: 'select_verification_status',
                defaultMessage: 'Select Verification Status',
              })}
            </option>
            <option value={UserVerificationFilter.VERIFIED}>Verified</option>
            <option value={UserVerificationFilter.UNVERIFIED}>
              Unverified
            </option>
          </select>
        </div>

        <div className="flex-1 ">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formatMessage({
              id: 'login_date_range',
              defaultMessage: 'Login Date Range',
            })}
          </label>
          <div className="flex items-center space-x-3">
            <label htmlFor="work-start" className="text-sm">
              {formatMessage({ id: 'from', defaultMessage: 'From' })}
            </label>
            <DatePicker
              id="work-start"
              onChange={(date) =>
                updateQuery('start', date ? new Date(date).toISOString() : null)
              }
              placeholderText={formatMessage({
                id: 'start_date',
                defaultMessage: 'Start date',
              })}
              dateFormat={getDateFormatPattern()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={
                router.query.start
                  ? parseDate(router.query.start as string)
                  : null
              }
              className="w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400"
            />
            <label htmlFor="work-end" className="text-sm">
              {formatMessage({ id: 'to', defaultMessage: 'To' })}
            </label>
            <DatePicker
              id="work-end"
              onChange={(date) =>
                updateQuery('end', date ? new Date(date).toISOString() : null)
              }
              placeholderText={formatMessage({
                id: 'end_date',
                defaultMessage: 'End Date',
              })}
              dateFormat={getDateFormatPattern()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              selected={
                router.query.end ? parseDate(router.query.end as string) : null
              }
              className="w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-400"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFilter;
