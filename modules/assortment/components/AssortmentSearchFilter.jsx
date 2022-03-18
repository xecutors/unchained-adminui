import FilterWrapper from '../../common/components/FilterWrapper';
import SearchField from '../../common/components/SearchField';
import TagInput from '../../common/components/TagInput';

const AssortmentSearchFilter = ({ onFilter }) => {
  const onApplyFilter = () => {
    onFilter({});
  };
  const onSearch = () => {
    onSearch({});
  };

  return (
    <FilterWrapper
      className="bg-white shadow my-2 pt-2"
      onApplyFilter={onApplyFilter}
    >
      <div className="grid grid-cols-6 gap-6 mb-5 px-4 mt-4">
        <div className="col-span-6 sm:col-span-3">
          <SearchField onInputChange={onSearch} />
        </div>

        <div className="col-span-6 sm:col-span-3">
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

export default AssortmentSearchFilter;
