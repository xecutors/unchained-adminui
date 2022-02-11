import FilterOptionsListItem from './FilterOptionsListItem';

const FiltersOptionsList = ({ options, onRemoveFilter, selectedLocale }) => {
  return options.map((filter) => (
    <FilterOptionsListItem
      key={filter._id}
      filter={filter}
      onDelete={onRemoveFilter}
      selectedLocale={selectedLocale}
    />
  ));
};

export default FiltersOptionsList;
