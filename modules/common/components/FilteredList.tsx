import { useIntl } from 'react-intl';
import FilteredListItem from './FilteredListItem';
import NoData from './NoData';

const FilteredList = ({ data, onSelected }) => {
  const { formatMessage } = useIntl();
  return data?.length ? (
    data?.map((item) => (
      <FilteredListItem key={item.id} item={item} onSelected={onSelected} />
    ))
  ) : (
    <NoData
      message={formatMessage({
        id: 'filtered_data',
        defaultMessage: 'Filtered data',
      })}
    />
  );
};

export default FilteredList;
