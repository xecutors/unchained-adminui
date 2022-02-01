import FilterWrapper from '../../common/components/FilterWrapper';
import SearchField from '../../common/components/SearchField';
import TagInput from '../../common/components/TagInput';

const ProductFilter = ({ onSearch, onFilter }) => {
  const onApplyFilter = () => {
    onFilter({});
  };
  return (
    <FilterWrapper
      className="bg-white shadow mb-2 p-6 "
      onApplyFilter={onApplyFilter}
    >
      <div className="lg:flex">
        <div className="flex-1 ml-2 mt-2">
          <SearchField onInputChange={onSearch} />
        </div>

        <div className="flex-1 ml-2">
          <TagInput
            onChange={async (value) => {
              await { tags: value };
            }}
          />
        </div>
      </div>
    </FilterWrapper>
  );
};

export default ProductFilter;
