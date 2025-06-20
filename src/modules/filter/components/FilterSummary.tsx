import { useIntl } from 'react-intl';

const FilterSummary = ({ filterKey, filterType }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="space-y-2 lg:flex lg:space-y-0 lg:space-x-3">
      <div className="flex items-center space-x-1">
        <div className="text-sm">
          {formatMessage({ id: 'key', defaultMessage: 'Key' })}
        </div>
        <div className="rounded-md bg-slate-200 py-1 px-2 text-sm dark:text-slate-600">
          {filterKey}
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <div className="text-sm">
          {formatMessage({
            id: 'filter_type',
            defaultMessage: 'Filter Type',
          })}
        </div>
        <div className="rounded-md bg-slate-200 py-1 px-2 text-sm dark:text-slate-600">
          {filterType}
        </div>
      </div>
    </div>
  );
};

export default FilterSummary;
