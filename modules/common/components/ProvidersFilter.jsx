import { useIntl } from 'react-intl';

const ProvidersFilter = ({ providerType, onProviderFilterChange }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="w-100 ml-2 mt-2">
      <div className="relative my-2 flex items-start">
        <select
          onChange={(e) => onProviderFilterChange(e.target.value || null)}
          defaultValue={null}
          id="select-type"
          name="select-type"
          placeholder={formatMessage({
            id: 'filter_by_type',
            defaultMessage: 'Filter by type',
          })}
          input-hint="Filter provider by type"
          autoComplete="off"
          className="w-50 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
        >
          <option value="">
            {formatMessage({
              id: 'filter_by_type',
              defaultMessage: 'Filter by type',
            })}
          </option>
          {providerType.map((type) => (
            <option key={type} value={type}>
              {formatMessage({
                id: type,
                defaultMessage: type,
                description: 'Delivery provider type',
              })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProvidersFilter;
