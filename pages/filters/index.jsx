import FilterList from '../../modules/filters/FilterList';

const index = () => {
  const { filters } = useFilters();

  return <div>{filters && <FilterList filters={filters} />}</div>;
};

export default index;
