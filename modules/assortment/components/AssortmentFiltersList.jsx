import { useIntl } from 'react-intl';
import NoData from '../../common/components/NoData';
import AssortmentFiltersListItem from './AssortmentFiltersListItem';

const AssortmentFiltersList = ({ filters, onRemoveFilter }) => {
  const { formatMessage } = useIntl();
  return filters?.length ? (
    filters.map((filter) => (
      <AssortmentFiltersListItem
        key={filter._id}
        link={filter}
        onDelete={onRemoveFilter}
      />
    ))
  ) : (
    <NoData
      message={formatMessage({
        id: 'filters',
        defaultMessage: 'Filters',
      })}
    />
  );
};

export default AssortmentFiltersList;
