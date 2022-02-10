import AssortmentFiltersListItem from './AssortmentFiltersListItem';

const AssortmentFiltersList = ({ filters, onRemoveFilter }) => {
  return filters.map((filter) => (
    <AssortmentFiltersListItem
      key={filter._id}
      filter={filter}
      onDelete={onRemoveFilter}
    />
  ));
};

export default AssortmentFiltersList;
